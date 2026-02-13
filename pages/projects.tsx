import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout, { PageWrapper } from '../components/Layout';
import Tabs, { TabItems } from '../components/Tabs';
import MansoryLayout from '../components/Mansory';
import MansoryItem from '../components/Mansory/mansory-item';
import { ProjectsContext } from '../components/Utils/context';
import { getTransitions } from '../components/Utils';

const Projects = () => {
  const projectsData = useContext(ProjectsContext);

  return (
    <Layout title="Projets">
      <StandardSection id="projects">
        <PageWrapper>
          <motion.div {...getTransitions(0.2)}>
            <h1 className="intro__text">Projets.</h1>
          </motion.div> <br />
          <MansoryLayout>
            {projectsData.map((item, index) => (
              <MansoryItem key={index} item={item} />
            ))}
          </MansoryLayout>
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

  button {
    font-size: calc(var(--font-sm) + 1.5px);
    background: var(--mark);
    border: none;
    border-radius: 5px;
    padding: 0px 9px;
  }
`;

export default Projects;
