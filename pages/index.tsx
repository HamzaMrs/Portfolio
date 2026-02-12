/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { arrayRandomItem } from 'codewonders-helpers';
import { motion } from 'framer-motion';
const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

/* -------------------------- Internal Dependencies ------------------------- */

import Layout, { PageWrapper } from '../components/Layout';
import { getTransitions } from '../components/Utils';

const Home = () => {
  const [color] = useState(arrayRandomItem(['#37609c', '#34c759', '#5856d6']));

  return (
    <Layout>
      <PageSection color={color} id="home">
        <PageWrapper>
          <article className="hero">
            <motion.h1
              className="hero__title"
              data-text="Hamza Mars"
              {...getTransitions(0.1)}
            >
              <span className="hero__first">Hamza</span>
              <span className="hero__last">Mars</span>
            </motion.h1>
            <motion.div className="hero__subtitle" {...getTransitions(0.3)}>
              <Typewriter
                options={{
                  strings: ['DÉVELOPPEUR'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </motion.div>
          </article>
        </PageWrapper>
      </PageSection>
    </Layout>
  );
};

const PageSection = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;

  .hero {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .hero__title {
    position: relative;
    display: flex;
    flex-direction: column;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: 0.02em;
    margin: 0;
    font-size: 8rem;

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      letter-spacing: 4px;
      pointer-events: none;
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
      clip-path: inset(61% 0 30% 0);
    }
    80% {
      clip-path: inset(1% 0 97% 0);
    }
    85% {
      clip-path: inset(23% 0 64% 0);
    }
    90% {
      clip-path: inset(53% 0 25% 0);
    }
    95% {
      clip-path: inset(15% 0 53% 0);
    }
    100% {
      clip-path: inset(78% 0 6% 0);
    }
  }

  .hero__first,
  .hero__last {
    display: block;
  }

  .hero__subtitle {
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: 700;
    color: #6c3971;
    margin: 0;
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

export default Home;
