/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { arrayRandomItem } from 'codewonders-helpers';
import { motion } from 'framer-motion';

/* -------------------------- Internal Dependencies ------------------------- */

import Layout, { PageWrapper } from '../components/Layout';
import Tabs, { TabItems } from '../components/Tabs';
import MansoryLayout from '../components/Mansory';
import MansoryItem from '../components/Mansory/mansory-item';
import { ProjectsContext } from '../components/Utils/context';

import { getTransitions } from '../components/Utils';
import emailjs from '@emailjs/browser';

const Home = () => {
  const [color] = useState(arrayRandomItem(['#37609c', '#34c759', '#5856d6']));
  const projectsData = useContext(ProjectsContext);
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorObj(null);

    if (form.current) {
      emailjs
        .sendForm(
          'service_18lx8ok',
          'template_1muwlsl',
          form.current,
          'wyfBy7vjKfXBFFm8y'
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccess(true);
            setLoading(false);
            form.current?.reset();
          },
          (error) => {
            console.log(error.text);
            setErrorObj(error.text || "Une erreur s'est produite. Veuillez réessayer.");
            setLoading(false);
          }
        );
    }
  };

  return (
    <Layout>
      <PageSection color={color} id="home">
        <PageWrapper>
          <article>
            <motion.h1
              data-text="Hamza Mars"
              className="intro__text hero__title"
              {...getTransitions(0.1)}
            >
              <mark className="mark">Hamza Mars</mark>
            </motion.h1>
            <motion.p {...getTransitions(0.2)}>
              Étudiant en informatique à l'<strong>EFREI Paris Panthéon-Assas</strong>, 
              passionné par le développement web et la création d'expériences 
              digitales uniques.
            </motion.p>
            <motion.p {...getTransitions(0.35)}>
              Je passe mes journées (et souvent mes nuits) à coder des{' '}
              <a href="#projects" aria-label="Voir mes Projets">
                Projets
              </a>{' '}
              personnels, explorant React, Next.js, TypeScript et tout ce qui 
              repousse les limites du web moderne.
            </motion.p>
            <motion.p {...getTransitions(0.5)}>
              Curieux et en apprentissage permanent, je partage mes découvertes 
              à travers des{' '}
              <Link
                href="/articles"
                aria-label="Voir mes Articles"
              >
                Articles
              </Link>{' '}
              et des projets open-source. Toujours à la recherche du prochain 
              défi technique à relever.
            </motion.p>
            <motion.p {...getTransitions(0.65)}>
              Une question ? Envie d'échanger ? N'hésite pas à me{' '}
              <a href="#contact" aria-label="Me Contacter">
                Contacter
              </a>.
            </motion.p>
          </article>

          <br />

          <br />
        </PageWrapper>
      </PageSection>

      <StandardSection id="projects">
        <PageWrapper>
          <h1 className="intro__text">Projets.</h1> <br />
          <Tabs>
            <TabItems label="All">
              <MansoryLayout>
                {projectsData.map((item, index) => (
                  <MansoryItem key={index} item={item} />
                ))}
              </MansoryLayout>
            </TabItems>
            <TabItems label="Projects">
              <MansoryLayout>
                {projectsData.map(
                  (item, index) =>
                    item.type.includes('project') && (
                      <MansoryItem key={index} item={item} />
                    )
                )}
              </MansoryLayout>
            </TabItems>
            <TabItems label="Dev Tools">
              <MansoryLayout>
                {projectsData.map(
                  (item, index) =>
                    item.type.includes('tools') && (
                      <MansoryItem key={index} item={item} />
                    )
                )}
              </MansoryLayout>
            </TabItems>
            <TabItems label="Open Source">
              <MansoryLayout>
                {projectsData.map(
                  (item, index) =>
                    item.type.includes('open-source') && (
                      <MansoryItem key={index} item={item} />
                    )
                )}
              </MansoryLayout>
            </TabItems>
          </Tabs>
        </PageWrapper>
      </StandardSection>

      <StandardSection id="contact">
        <PageWrapper>
          <h1 className="intro__text">Contact.</h1>
          <article>
            <p>
              Contactez-moi ou envoyez-moi un email directement sur{' '}
              <b>hamza31mars@gmail.com</b>
            </p>
          </article>
          <br />
          <form ref={form} onSubmit={sendEmail}>
            <div className="fields">
              <div className="field half">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Nom"
                  aria-required="true"
                  required
                />
              </div>
              <div className="field half">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  aria-required="true"
                  required
                />
              </div>
              <div className="field">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="form-control"
                  placeholder="Message"
                  aria-required="true"
                  required
                />
              </div>
            </div>
            <button
              className="btn btn-default"
              type="submit"
              aria-label="Envoyer"
              disabled={loading}
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
            {success && (
              <p style={{ marginTop: '1rem', color: '#34c759' }}>
                Merci ! Votre message a bien été envoyé.
              </p>
            )}
            {errorObj && (
              <p style={{ marginTop: '1rem', color: '#ff3b30' }}>
                {errorObj}
              </p>
            )}
          </form>
        </PageWrapper>
      </StandardSection>
        
    </Layout>
  );
};

const PageSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  
  .intro__text {
    font-size: 2.275em;
    font-weight: 500;
    margin: 2rem 0rem 1.5rem;
    position: relative;
    text-transform: uppercase;
    letter-spacing: 4px;

    &.hero__title {
      font-size: 4.5em;
      letter-spacing: 8px;
      margin-bottom: 2.5rem;
      
      @media (max-width: 768px) {
        font-size: 3em;
        letter-spacing: 5px;
      }
      
      @media (max-width: 480px) {
        font-size: 2.2em;
        letter-spacing: 3px;
      }
    }

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      letter-spacing: 4px;
    }

    &.hero__title::before,
    &.hero__title::after {
      letter-spacing: 8px;
      
      @media (max-width: 768px) {
        letter-spacing: 5px;
      }
      
      @media (max-width: 480px) {
        letter-spacing: 3px;
      }
    }

    &::before {
      left: 2px;
      text-shadow: -1px 0 #00ffff;
      animation: noise-anim-2 15s infinite linear alternate-reverse;
    }

    &::after {
      left: -2px;
      text-shadow: 3px 0 #ff69b4;
      animation: noise-anim 2s infinite linear alternate-reverse;
    }

    @keyframes noise-anim {
      0% {
        clip-path: inset(29% 0 25% 0);
      }
      5% {
        clip-path: inset(9% 0 38% 0);
      }
      10% {
        clip-path: inset(96% 0 1% 0);
      }
      15% {
        clip-path: inset(75% 0 23% 0);
      }
      20% {
        clip-path: inset(46% 0 50% 0);
      }
      25% {
        clip-path: inset(3% 0 46% 0);
      }
      30% {
        clip-path: inset(82% 0 2% 0);
      }
      35% {
        clip-path: inset(88% 0 1% 0);
      }
      40% {
        clip-path: inset(91% 0 8% 0);
      }
      45% {
        clip-path: inset(96% 0 2% 0);
      }
      50% {
        clip-path: inset(59% 0 38% 0);
      }
      55% {
        clip-path: inset(41% 0 53% 0);
      }
      60% {
        clip-path: inset(21% 0 47% 0);
      }
      65% {
        clip-path: inset(89% 0 4% 0);
      }
      70% {
        clip-path: inset(1% 0 95% 0);
      }
      75% {
        clip-path: inset(86% 0 4% 0);
      }
      80% {
        clip-path: inset(95% 0 5% 0);
      }
      85% {
        clip-path: inset(54% 0 36% 0);
      }
      90% {
        clip-path: inset(70% 0 27% 0);
      }
      95% {
        clip-path: inset(6% 0 16% 0);
      }
      100% {
        clip-path: inset(95% 0 2% 0);
      }
    }
    @keyframes noise-anim-2 {
      0% {
        clip-path: inset(76% 0 21% 0);
      }
      5% {
        clip-path: inset(54% 0 7% 0);
      }
      10% {
        clip-path: inset(55% 0 29% 0);
      }
      15% {
        clip-path: inset(89% 0 3% 0);
      }
      20% {
        clip-path: inset(33% 0 40% 0);
      }
      25% {
        clip-path: inset(17% 0 56% 0);
      }
      30% {
        clip-path: inset(37% 0 51% 0);
      }
      35% {
        clip-path: inset(38% 0 19% 0);
      }
      40% {
        clip-path: inset(93% 0 4% 0);
      }
      45% {
        clip-path: inset(44% 0 14% 0);
      }
      50% {
        clip-path: inset(53% 0 26% 0);
      }
      55% {
        clip-path: inset(67% 0 11% 0);
      }
      60% {
        clip-path: inset(85% 0 13% 0);
      }
      65% {
        clip-path: inset(27% 0 37% 0);
      }
      70% {
        clip-path: inset(87% 0 4% 0);
      }
      75% {
        clip-path: inset(10% 0 8% 0);
      }
      80% {
        clip-path: inset(51% 0 27% 0);
      }
      85% {
        clip-path: inset(10% 0 60% 0);
      }
      90% {
        clip-path: inset(83% 0 3% 0);
      }
      95% {
        clip-path: inset(23% 0 55% 0);
      }
      100% {
        clip-path: inset(1% 0 81% 0);
      }
    }
  }
  p {
    font-size: calc(var(--font-sm) + 0.9px);
    line-height: 2.3;
    font-weight: 400;
    color: var(--article-color) !important;
  }
  button {
    font-size: var(--font-sm);
    background: var(--button-index);
    border: none;
    border-radius: 5px;
    transition: all 0.4s ease;
    padding: 1px 12px;
    &:hover {
      background: ${(props) => props.color};
      color: #fff;
    }
  }
  @media (max-width: 585px) {
    margin: 3rem 0;
    display: block;
    min-height: 100%;
  }
  @media (max-width: 989px) {
    margin: 3rem 0;
    display: block;
  }
  @media (max-width: 220px) {
    margin: 3rem 0;
    display: block;
    min-height: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    /* Stop the animation */

    .intro__text {
      animation: none;

      &::before,
      &::after {
        content: none;
      }
    }
  }
`;

const StandardSection = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .intro__text {
    font-size: var(--font-x-lg);
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

  /* PROJECT STYLES */
  button {
    font-size: calc(var(--font-sm) + 1.5px);
    background: var(--mark);
    border: none;
    border-radius: 5px;
    padding: 0px 9px;
  }

  /* CONTACT STYLES */
  input,
  textarea {
    background: transparent;
    color: var(--cw) !important;
    margin-bottom: 2rem;
    box-shadow: none !important;
    resize: none;
    padding: 24px 21px !important;
    border-color: var(--border-color) !important;
    width: 100%;
    &:focus {
      background-color: var(--bg);
    }
  }

  button.btn {
    font-size: calc(var(--font-sm) + 1.1px);
    background: var(--cw);
    border: none;
    color: var(--bg);
    border-radius: 5px;
    padding: 15px 40px;
    margin-bottom: 3rem;
    cursor: pointer;
  }

  form {
    width: 60%;
  }

  @media (max-width: 989px) {
    form {
      width: 100% !important;
    }
  }
`;
export default Home;
