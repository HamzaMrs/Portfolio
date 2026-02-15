import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getTransitions } from '../../../lib/animations';

interface Skill {
  name: string;
  category: string;
}

const skillsList: Skill[] = [
  { name: 'Développement Full-Stack & Gestion d\'état (MERN, Redux, TypeScript)', category: 'Backend/Frontend' },
  { name: 'Architecture Microservices, Docker & CI/CD (Vercel, GitHub)', category: 'DevOps' },
  { name: 'Intégration d\'APIs (TMDB, YouTube, Leaflet)', category: 'Integration' },
  { name: 'Authentification & Sécurité (JWT, bcrypt)', category: 'Security' },
  { name: 'UI/UX responsive & animations (Tailwind, SCSS)', category: 'Design' },
  { name: 'Tests unitaires & E2E (Jest, Cypress)', category: 'Testing' },
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
            <div className="highlight" />
            <div className="content-wrapper">
              <span className="category">{skill.category}</span>
              <p>{skill.name}</p>
            </div>
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
  background: var(--gray-alpha); 
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;

  position: relative;
  overflow: hidden;

  // The highlight background effect
  .highlight {
    position: absolute;
    inset: 0;
    z-index: 0;
    height: 100%;
    border-radius: 12px;
    background: #6c3971;
    transform: translateY(102%);
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  // The visible content wrapper
  .content-wrapper {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -10px rgba(0,0,0,0.1);
    border-color: #6c3971;
    // Add delay to border color change so it matches the fill animation better
    transition: border-color 300ms ease 100ms, transform 0.3s ease, box-shadow 0.3s ease;
    
    // Animate background up
    .highlight {
      transform: translateY(0);
    }
    
    // Change text colors on hover
    p {
      color: #fff !important;
      position: relative; // Ensure z-index works
      z-index: 2;
    }

    .category {
      color: #fff !important;
      background: rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 2;
    }
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--cw);
    transition: color 200ms ease-in-out;
  }

  .category {
    display: inline-block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--border-color);
    color: var(--article-color);
    font-weight: 700;
    transition: all 200ms ease-in-out;
  }
`;

export default Skills;
