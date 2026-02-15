'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

type Message = {
  role: 'user' | 'bot'
  content: string
}

// ===== Base de connaissances élargie =====
const KNOWLEDGE = {
  name: 'Hamza Mars',
  email: 'hamza31mars@gmail.com',
  github: 'https://github.com/HamzaMrs',
  role: 'Développeur Full-Stack',
  location: 'Paris / Île-de-France',
  languages: ['Français (natif)', 'Anglais'],
  description:
    "Étudiant en informatique à l'EFREI Paris Panthéon-Assas, passionné par le développement web et la création d'expériences digitales uniques.",
  formation: {
    school: 'EFREI Paris Panthéon-Assas',
    field: 'Informatique',
    detail:
      "Cursus en informatique avec spécialisation développement web. Formation complète couvrant algorithmique, bases de données, architecture logicielle et développement Full-Stack.",
  },
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'MySQL', 'JWT', 'bcrypt'],
    devops: ['Docker', 'GitHub Actions', 'Vercel', 'CI/CD'],
    design: ['UI/UX responsive', 'Animations CSS', 'Figma'],
    testing: ['Jest', 'Cypress'],
    tools: ['Git', 'VS Code', 'Redux Toolkit', 'Context API', 'Vite'],
  },
  softSkills: ['Curiosité', 'Rigueur', 'Autonomie', "Travail d'équipe", 'Adaptabilité', 'Résolution de problèmes'],
  projects: [
    {
      name: 'Cloudify',
      desc: 'Plateforme de location de nuages en temps réel avec visualisation cartographique.',
      about:
        'Application full-stack microservices permettant de louer des nuages virtuels (Cumulonimbus, Stratus, Cirrus) avec authentification JWT, suivi en temps réel et interface cartographique interactive. Architecture 4-tiers conteneurisée avec Docker.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Docker', 'Tailwind CSS', 'Leaflet', 'JWT', 'Vite'],
      github: 'https://github.com/HamzaMrs/Cloudify',
    },
    {
      name: 'Streamza',
      desc: 'Site de streaming style Netflix avec recherche, favoris et bandes-annonces.',
      about:
        "Application web inspirée de Netflix, développée en JavaScript Vanilla avec l'API TMDB. Découverte de films tendances, recherche par titre, favoris localStorage, lecteur de trailers YouTube, personnalisation de thème et hero slider avec parallax.",
      tech: ['JavaScript', 'HTML', 'CSS', 'TMDB API'],
      github: 'https://github.com/HamzaMrs/Streamza',
      link: 'https://hamzamrs.github.io/Streamza/',
    },
    {
      name: 'StreamzaX',
      desc: 'Plateforme de streaming moderne avec recherche, favoris et bandes-annonces.',
      about:
        "Plateforme de streaming utilisant l'API TMDB pour explorer films tendances, populaires, mieux notés et à venir. Favoris, recherche en temps réel, bandes-annonces YouTube, architecture React avec hooks personnalisés et Context API.",
      tech: ['React', 'JavaScript', 'CSS', 'Vite', 'TMDB API', 'TypeScript'],
      github: 'https://github.com/HamzaMrs/StreamzaX',
    },
    {
      name: 'Kanban',
      desc: 'Application de gestion de tâches avec drag & drop et multi-tableaux.',
      about:
        "Application de gestion de projet avec React et Redux Toolkit. Multi-tableaux, CRUD complet, sous-tâches avec progression, drag & drop intuitif, gestion des statuts, interface responsive avec mode sombre.",
      tech: ['React', 'Redux Toolkit', 'JavaScript', 'CSS', 'UUID'],
      github: 'https://github.com/HamzaMrs/Kanban',
      link: 'https://HamzaMrs.github.io/Kanban',
    },
  ],
  hobbies: ['Coder des projets perso', 'Veille technologique', 'Cinéma', 'Explorer de nouvelles technologies'],
  contact: 'Tu peux me contacter via le formulaire sur la section Contact ou par email.',
  portfolio:
    "Ce portfolio est développé avec Next.js, TypeScript, styled-components et Framer Motion. Il est déployé sur Vercel avec CI/CD automatique.",
}

// ===== Quick Reply suggestions =====
const INITIAL_SUGGESTIONS = ['Compétences', 'Projets', 'Formation', 'Contact']

function getFollowUpSuggestions(intent: string): string[] {
  switch (intent) {
    case 'skills':
      return ['Projets', 'Formation', 'Soft skills']
    case 'projects':
      return ['Cloudify', 'Streamza', 'Kanban', 'Contact']
    case 'formation':
      return ['Compétences', 'Projets', 'GitHub']
    case 'contact':
      return ['Projets', 'Compétences', 'CV']
    case 'project-detail':
      return ['Autres projets', 'Compétences', 'Contact']
    default:
      return ['Compétences', 'Projets', 'Contact']
  }
}

// ===== Réponses intelligentes =====
function getBotResponse(input: string): { text: string; intent: string } {
  const q = input.toLowerCase().trim()

  // Salutations
  if (/^(salut|hello|bonjour|hey|coucou|hi|yo|wesh)/i.test(q)) {
    return {
      text: `Salut ! 👋 Je suis l'assistant de ${KNOWLEDGE.name}. Pose-moi une question sur son parcours, ses compétences ou ses projets !`,
      intent: 'greeting',
    }
  }

  // Qui est-il
  if (/qui (es[- ]?tu|est|êtes)/i.test(q) || /c'?est qui/i.test(q) || /présente/i.test(q)) {
    return {
      text: `${KNOWLEDGE.name} est un ${KNOWLEDGE.role} basé à ${KNOWLEDGE.location}.\n\n${KNOWLEDGE.description}`,
      intent: 'identity',
    }
  }

  // Formation / école
  if (/form(ation)?|école|ecole|étud|etud|diplôme|diplome|efrei|parcours scolaire|cursus/i.test(q)) {
    return {
      text: `🎓 Formation :\n\n• ${KNOWLEDGE.formation.school}\n• Filière : ${KNOWLEDGE.formation.field}\n\n${KNOWLEDGE.formation.detail}`,
      intent: 'formation',
    }
  }

  // Projets spécifiques
  for (const project of KNOWLEDGE.projects) {
    if (q.includes(project.name.toLowerCase())) {
      const links = []
      if (project.github) links.push(`GitHub : ${project.github}`)
      if (project.link) links.push(`Démo : ${project.link}`)
      return {
        text: `🚀 ${project.name}\n\n${project.about}\n\n🛠 Technologies : ${project.tech.join(', ')}${links.length ? '\n\n🔗 ' + links.join('\n🔗 ') : ''}`,
        intent: 'project-detail',
      }
    }
  }

  // Projets généraux
  if (/projet|portfolio|réalisation|travaux|fait quoi|autres projet/i.test(q)) {
    const projectList = KNOWLEDGE.projects.map((p) => `• ${p.name} — ${p.desc}`).join('\n')
    return {
      text: `📂 Projets réalisés :\n\n${projectList}\n\nTu peux me demander des détails sur un projet en particulier !`,
      intent: 'projects',
    }
  }

  // Compétences techniques
  if (/comp[ée]tence|skill|technologie|tech|stack|langage|connai|maîtrise/i.test(q)) {
    const { frontend, backend, devops, design, testing, tools } = KNOWLEDGE.skills
    return {
      text: `💻 Compétences techniques :\n\n🎨 Frontend : ${frontend.join(', ')}\n\n⚙️ Backend : ${backend.join(', ')}\n\n🐳 DevOps : ${devops.join(', ')}\n\n🎯 Design : ${design.join(', ')}\n\n🧪 Testing : ${testing.join(', ')}\n\n🔧 Outils : ${tools.join(', ')}`,
      intent: 'skills',
    }
  }

  // Soft skills / qualités
  if (/qualit[ée]|soft.?skill|point.?fort|personnali|atout|humain/i.test(q)) {
    return {
      text: `✨ Qualités :\n\n${KNOWLEDGE.softSkills.map((s) => `• ${s}`).join('\n')}`,
      intent: 'soft-skills',
    }
  }

  // GitHub
  if (/github|repo|code source|open.?source/i.test(q)) {
    return {
      text: `🐙 GitHub : ${KNOWLEDGE.github}\n\nTous les projets sont disponibles en open-source !`,
      intent: 'github',
    }
  }

  // Contact / email / CV
  if (/contact|email|mail|joindre|écrire|recruter|embaucher|cv/i.test(q)) {
    return {
      text: `📬 ${KNOWLEDGE.contact}\n\n📧 Email : ${KNOWLEDGE.email}\n🐙 GitHub : ${KNOWLEDGE.github}`,
      intent: 'contact',
    }
  }

  // Localisation
  if (/o[uù] (es|habite|se trouve|situe|vit)|localisation|ville|région|paris|idf|ile.?de.?france/i.test(q)) {
    return {
      text: `📍 Localisation : ${KNOWLEDGE.location}`,
      intent: 'location',
    }
  }

  // Langues
  if (/langue|anglais|fran[cç]ais|parle/i.test(q)) {
    return {
      text: `🌍 Langues :\n\n${KNOWLEDGE.languages.map((l) => `• ${l}`).join('\n')}`,
      intent: 'languages',
    }
  }

  // Expérience / parcours pro
  if (/exp[ée]rience|carriè|travail/i.test(q)) {
    return {
      text: `${KNOWLEDGE.name} est étudiant à l'${KNOWLEDGE.formation.school}. Il travaille activement sur des projets Full-Stack modernes comme Cloudify (Microservices/Docker) et StreamzaX (React/Vite).\n\nIl est en recherche de nouvelles opportunités pour mettre ses compétences en pratique.`,
      intent: 'experience',
    }
  }

  // Disponibilité / freelance
  if (/dispo|disponible|freelance|mission|embauche|stage|alternance/i.test(q)) {
    return {
      text: `Pour connaître la disponibilité de ${KNOWLEDGE.name} ou discuter d'une opportunité :\n\n📧 ${KNOWLEDGE.email}`,
      intent: 'availability',
    }
  }

  // Hobbies
  if (/hobby|passion|temps libre|aime|intérêt|loisir/i.test(q)) {
    return {
      text: `🎯 Centres d'intérêt :\n\n${KNOWLEDGE.hobbies.map((h) => `• ${h}`).join('\n')}`,
      intent: 'hobbies',
    }
  }

  // Ce site / portfolio
  if (/ce site|portfolio|comment.*fait|techno.*site/i.test(q)) {
    return {
      text: `🌐 ${KNOWLEDGE.portfolio}`,
      intent: 'portfolio',
    }
  }

  // Aide
  if (/aide|help|quoi demander|que (peux|sais)/i.test(q)) {
    return {
      text: `Je peux répondre à plein de questions ! Par exemple :\n\n• Qui est ${KNOWLEDGE.name} ?\n• Ses compétences techniques\n• Ses projets (Cloudify, Streamza, Kanban...)\n• Sa formation\n• Comment le contacter\n• Son GitHub\n• Ses qualités\n• Ses langues\n• Sa localisation`,
      intent: 'help',
    }
  }

  // Merci
  if (/merci|thanks|thank/i.test(q)) {
    return {
      text: `De rien ! N'hésite pas si tu as d'autres questions 😊`,
      intent: 'thanks',
    }
  }

  // Au revoir
  if (/bye|au revoir|à plus|ciao|salut$/i.test(q)) {
    return { text: `À bientôt ! 👋`, intent: 'bye' }
  }

  // Fallback
  return {
    text: `Je ne suis pas sûr de comprendre ta question 🤔\n\nEssaie de me demander :\n• Les compétences de ${KNOWLEDGE.name}\n• Ses projets\n• Sa formation\n• Comment le contacter`,
    intent: 'fallback',
  }
}

// ===== Composant ChatBot =====
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: `Salut ! 👋 Pose-moi une question sur Hamza — ses projets, compétences ou parcours.`,
    },
  ])
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, scrollToBottom])

  const processMessage = useCallback((userMessage: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)
    setSuggestions([])

    setTimeout(() => {
      const { text, intent } = getBotResponse(userMessage)
      setMessages((prev) => [...prev, { role: 'bot', content: text }])
      setIsTyping(false)
      setSuggestions(getFollowUpSuggestions(intent))
    }, 400 + Math.random() * 300)
  }, [])

  const handleSend = useCallback(() => {
    if (!input.trim()) return
    const userMessage = input.trim()
    setInput('')
    processMessage(userMessage)
  }, [input, processMessage])

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      processMessage(suggestion)
    },
    [processMessage]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <ChatWindow $isOpen={isOpen}>
        <ChatHeader>
          <HeaderTitle>
            <StatusDot />
            <span>Assistant</span>
          </HeaderTitle>
          <CloseButton onClick={() => setIsOpen(false)} aria-label="Fermer le chat">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </CloseButton>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((msg, i) => (
            <MessageBubble key={i} $isUser={msg.role === 'user'}>
              {msg.content}
            </MessageBubble>
          ))}
          {isTyping && (
            <MessageBubble $isUser={false}>
              <TypingIndicator>
                <span></span>
                <span></span>
                <span></span>
              </TypingIndicator>
            </MessageBubble>
          )}
          {!isTyping && suggestions.length > 0 && (
            <SuggestionsContainer>
              {suggestions.map((s) => (
                <SuggestionButton key={s} onClick={() => handleSuggestionClick(s)}>
                  {s}
                </SuggestionButton>
              ))}
            </SuggestionsContainer>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris ta question..."
            disabled={isTyping}
          />
          <SendButton onClick={handleSend} disabled={!input.trim() || isTyping} aria-label="Envoyer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SendButton>
        </InputContainer>
      </ChatWindow>

      <FloatingButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen} aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}>
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm28.5-91.5Q400-623 400-640t-11.5-28.5Q377-680 360-680t-28.5 11.5Q320-657 320-640t11.5 28.5Q343-600 360-600t28.5-11.5Zm240 0Q640-623 640-640t-11.5-28.5Q617-680 600-680t-28.5 11.5Q560-657 560-640t11.5 28.5Q583-600 600-600t28.5-11.5ZM480-200Zm0-440Z" />
          </svg>
        )}
      </FloatingButton>
    </>
  )
}

// ===== Styled Components =====
const FloatingButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--bg);
  color: var(--cw);
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.25s ease;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    border-color: var(--cw);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }
`

const ChatWindow = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 96px;
  right: 28px;
  width: 380px;
  height: 520px;
  background: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9998;
  opacity: ${(p) => (p.$isOpen ? 1 : 0)};
  visibility: ${(p) => (p.$isOpen ? 'visible' : 'hidden')};
  transform: ${(p) => (p.$isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)')};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    right: 20px;
    bottom: 84px;
    height: 65vh;
  }
`

const ChatHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--mark);
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 14px;
  color: var(--cw);
  letter-spacing: 0.02em;
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--article-color);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: var(--button-index);
    color: var(--cw);
  }
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 85%;
  padding: 12px 16px;
  border-radius: ${(p) => (p.$isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px')};
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  align-self: ${(p) => (p.$isUser ? 'flex-end' : 'flex-start')};
  background: ${(p) => (p.$isUser ? 'var(--cw)' : 'var(--button-index)')};
  color: ${(p) => (p.$isUser ? 'var(--bg)' : 'var(--cw)')};
  border: ${(p) => (p.$isUser ? 'none' : '1px solid var(--border-color)')};
`

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-3px); }
`

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 2px 0;

  span {
    width: 6px;
    height: 6px;
    background: var(--article-color);
    border-radius: 50%;
    animation: ${bounce} 1.2s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.15s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
`

const SuggestionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-self: flex-start;
  margin-top: 4px;
`

const SuggestionButton = styled.button`
  padding: 6px 14px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: transparent;
  color: var(--cw);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #6c3971;
    border-color: #6c3971;
    color: #fff;
  }
`

const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 10px;
  background: var(--mark);
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg);
  color: var(--cw);
  font-size: 13px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: var(--article-color);
  }

  &:focus {
    border-color: var(--cw);
  }

  &:disabled {
    opacity: 0.6;
  }
`

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--cw);
  color: var(--bg);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
