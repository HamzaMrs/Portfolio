import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout, { PageWrapper } from '../components/Layout';
import { getTransitions } from '../components/Utils';
import { arrayRandomItem } from 'codewonders-helpers';

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
              Je passe mes journées (et souvent mes nuits) à coder des projets 
              personnels, explorant React, Next.js, TypeScript et tout ce qui 
              repousse les limites du web moderne.
            </motion.p>
            <motion.p {...getTransitions(0.5)}>
              Curieux et en apprentissage permanent, je partage mes découvertes 
              à travers des projets open-source. Toujours à la recherche du prochain 
              défi technique à relever.
            </motion.p>
          </article>
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
