import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getTransitions } from '../../../lib/animations';

interface Skill {
  name: string;
  category: string;
}

const skillsList: Skill[] = [
  { name: 'Développement Full-Stack (MERN/TypeScript)', category: 'Backend/Frontend' },
  { name: 'Architecture Microservices & Conteneurisation (Docker)', category: 'DevOps' },
  { name: 'Gestion d\'état (Redux Toolkit, Context API)', category: 'Frontend' },
  { name: 'Intégration d\'APIs (TMDB, YouTube, Leaflet)', category: 'Integration' },
  { name: 'Authentification & Sécurité (JWT, bcrypt)', category: 'Security' },
  { name: 'UI/UX responsive & animations (Tailwind, SCSS)', category: 'Design' },
  { name: 'Tests unitaires & E2E (Jest, Cypress)', category: 'Testing' },
  { name: 'CI/CD & Déploiement automatisé (Vercel, GitHub Pages)', category: 'DevOps' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <SkillsWrapper
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3>Compétences clés</h3>
      <SkillsGrid>
        {skillsList.map((skill, index) => (
          <SkillCard key={index} variants={itemVariants}>
            <span className="category">{skill.category}</span>
            <p>{skill.name}</p>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsWrapper>
  );
};

const SkillsWrapper = styled(motion.div)`
  margin-top: 4rem;
  width: 100%;

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 800;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: var(--gray-alpha); // Using theme variable
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -10px rgba(0,0,0,0.1);
    border-color: var(--article-color);
    
    .category {
      color: #fff;
      background: #6c3971;
    }
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--cw);
  }

  .category {
    display: inline-block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--border-color); // subtle background
    color: var(--article-color);
    font-weight: 700;
    transition: all 0.3s ease;
  }
`;

export default Skills;
