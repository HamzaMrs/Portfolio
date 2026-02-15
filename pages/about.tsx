import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout, { PageWrapper } from '../components/layout/Layout';
import { getTransitions } from '../lib/animations';
import { arrayRandomItem } from 'codewonders-helpers';
import Skills from '../components/sections/Skills';

const About = () => {
  const [color] = useState(arrayRandomItem(['#37609c', '#34c759', '#5856d6']));

  return (
    <Layout title="À propos">
      <StandardSection id="about">
        <PageWrapper>
          <h1 className="intro__text">À propos.</h1>
          <article>
            <motion.p {...getTransitions(0.2)}>
              Étudiant en informatique à l'<strong>EFREI Paris Panthéon-Assas</strong>,
              passionné par le développement web et la création d'expériences
              digitales uniques.
            </motion.p>
            <motion.p {...getTransitions(0.35)}>
              Au fil de mes projets personnels, je développe mes compétences aussi bien en frontend qu’en backend, avec une attention particulière portée à l’expérience utilisateur.
              Curieux et rigoureux, j’explore régulièrement de nouveaux langages, outils et frameworks afin d’élargir mes compétences et de rester en phase avec les standards actuels du web.
            </motion.p>
            <motion.p {...getTransitions(0.5)}>
              Toujours motivé par de nouveaux défis techniques, je cherche en permanence à progresser et à renforcer mon expertise de développeur.
            </motion.p>
          </article>
          <Skills />
        </PageWrapper>
      </StandardSection>
    </Layout>
  );
};

const StandardSection = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .intro__text {
    font-size: 8rem;
    font-weight: 900;
    margin: 4rem 0rem 1.5rem;
    position: relative;
  }

  p {
    font-size: calc(var(--font-sm) + 0.9px);
    margin-top: 0.6rem;
    line-height: 2;
    font-weight: 400;
    color: var(--article-color) !important;
  }
`;

export default About;
