'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

type Message = {
  role: 'user' | 'bot'
  content: string
}

// ===== Base de connaissances =====
const KNOWLEDGE = {
  name: 'Hamza Mars',
  email: 'hamza31mars@gmail.com',
  role: 'Développeur Full-Stack',
  description: "Étudiant en informatique à l'EFREI Paris Panthéon-Assas, passionné par le développement web et la création d'expériences digitales.",
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Docker', 'Tailwind CSS', 'Redux Toolkit'],
  projects: [
    { name: 'Cloudify', desc: 'Plateforme de location de nuages avec architecture microservices', tech: 'React, Node.js, Docker' },
    { name: 'Streamza', desc: 'Site de streaming inspiré de Netflix', tech: 'JavaScript, TMDB API' },
    { name: 'StreamzaX', desc: 'Plateforme de streaming moderne et réactive', tech: 'React, Vite, TypeScript' },
    { name: 'Kanban', desc: 'Application de gestion de tâches avec Drag & Drop', tech: 'React, Redux Toolkit' },
  ],
  hobbies: ['Coder des projets perso', 'Veille technologique', 'Cinéma'],
  contact: 'Tu peux me contacter via le formulaire sur la section Contact ou par email.',
}

// ===== Réponses intelligentes =====
function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim()

  if (/^(salut|hello|bonjour|hey|coucou|hi)/i.test(q)) {
    return `Bonjour ! Je suis l'assistant de ${KNOWLEDGE.name}. Comment puis-je t'aider ? Tu peux me poser des questions sur ses compétences, projets, ou comment le contacter.`
  }

  if (/qui (es[- ]?tu|est|êtes)/i.test(q) || /c'?est qui/i.test(q) || /présente/i.test(q)) {
    return `${KNOWLEDGE.name} est un ${KNOWLEDGE.role}. ${KNOWLEDGE.description}`
  }

  if (/comp[ée]tence|skill|technologie|tech|stack|langage|connai/i.test(q)) {
    return `Compétences principales :\n\n${KNOWLEDGE.skills.map(s => `• ${s}`).join('\n')}\n\nParticulièrement à l'aise avec React et l'écosystème JavaScript/TypeScript.`
  }

  if (/projet|portfolio|réalisation|travaux|fait quoi/i.test(q)) {
    const projectList = KNOWLEDGE.projects
      .map(p => `• ${p.name} — ${p.desc}`)
      .join('\n')
    return `Projets réalisés :\n\n${projectList}\n\nConsulte la section "Projets" pour plus de détails.`
  }

  if (/contact|email|mail|joindre|écrire|recruter|embaucher|cv/i.test(q)) {
    return `${KNOWLEDGE.contact}\n\nEmail : ${KNOWLEDGE.email}`
  }

  if (/exp[ée]rience|parcours|carriè|travail/i.test(q)) {
    return `${KNOWLEDGE.name} est étudiant à l'EFREI Paris. Il travaille sur des projets Full-Stack modernes comme Cloudify (Microservices) ou StreamzaX (React/Vite).`
  }

  if (/dispo|disponible|freelance|mission|embauche/i.test(q)) {
    return `Pour connaître la disponibilité de ${KNOWLEDGE.name}, contacte-le directement :\n\n${KNOWLEDGE.email}`
  }

  if (/hobby|passion|temps libre|aime|intérêt/i.test(q)) {
    return `Centres d'intérêt :\n\n${KNOWLEDGE.hobbies.map(h => `• ${h}`).join('\n')}`
  }

  if (/merci|thanks|thank/i.test(q)) {
    return `De rien. N'hésite pas si tu as d'autres questions.`
  }

  if (/bye|au revoir|à plus|ciao|salut$/i.test(q)) {
    return `À bientôt.`
  }

  return `Je ne suis pas sûr de comprendre.\n\nTu peux me demander :\n• Qui est ${KNOWLEDGE.name} ?\n• Quelles sont ses compétences ?\n• Ses projets\n• Comment le contacter`
}

// ===== Composant ChatBot =====
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: `Bonjour. Je suis l'assistant de Hamza. Pose-moi une question sur son parcours, ses projets ou ses compétences.` }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, scrollToBottom])

  const handleSend = useCallback(() => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(userMessage)
      setMessages(prev => [...prev, { role: 'bot', content: response }])
      setIsTyping(false)
    }, 500 + Math.random() * 300)
  }, [input])

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
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SendButton>
        </InputContainer>
      </ChatWindow>

      <FloatingButton 
        onClick={() => setIsOpen(!isOpen)} 
        $isOpen={isOpen}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm28.5-91.5Q400-623 400-640t-11.5-28.5Q377-680 360-680t-28.5 11.5Q320-657 320-640t11.5 28.5Q343-600 360-600t28.5-11.5Zm240 0Q640-623 640-640t-11.5-28.5Q617-680 600-680t-28.5 11.5Q560-657 560-640t11.5 28.5Q583-600 600-600t28.5-11.5ZM480-200Zm0-440Z"/>
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
  opacity: ${p => (p.$isOpen ? 1 : 0)};
  visibility: ${p => (p.$isOpen ? 'visible' : 'hidden')};
  transform: ${p => (p.$isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)')};
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
  border-radius: ${p => p.$isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px'};
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  align-self: ${p => (p.$isUser ? 'flex-end' : 'flex-start')};
  background: ${p => (p.$isUser ? 'var(--cw)' : 'var(--button-index)')};
  color: ${p => (p.$isUser ? 'var(--bg)' : 'var(--cw)')};
  border: ${p => (p.$isUser ? 'none' : '1px solid var(--border-color)')};
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

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
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
