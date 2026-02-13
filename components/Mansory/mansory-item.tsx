/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { arrayRandomItem } from 'codewonders-helpers';
import { useRouter, withRouter } from 'next/router';
/* -------------------------- Internal Dependencies ------------------------- */
import Image from '../Image';
import SideBarModal from '../SidebarModal';

/* -------------------------- MansoryItem PropTypes ------------------------- */
interface MansoryItemProps {
  item: {
    title: string;
    description?: string;
    imageUrl: string;
    link?: string;
    github?: string;
    about?: string;
    technologies?: string[];
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const MansoryItem: React.FC<MansoryItemProps> = ({ item }) => {
  const router = useRouter();
  const { pathname } = router;
  const [show, setShow] = useState(false);
  const [height] = useState(arrayRandomItem(['400px', '454px', '310px']));

  return (
    <>
      {!pathname.includes('/projects') ? (
        <a
          href={item.link}
          target="_blank"
          style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
          rel="noopener noreferrer"
          title={item.title}
          id="cardHover"
          aria-label={`${item.title} ${item.description}`}
        >
          <MansoryItemStyle
            variants={itemVariants}
            {...{ item }}
            style={{
              height,
            }}
            role="gridcell"
          >
            {item.imageUrl.endsWith('.mov') ||
            item.imageUrl.endsWith('.mp4') ? (
              <video
                src={item.imageUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Image src={item.imageUrl} alt={item.imageUrl} />
            )}
            <div className="content__slate">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </MansoryItemStyle>
        </a>
      ) : (
        <>
          <MansoryItemStyle
            variants={itemVariants}
            {...{ item }}
            style={{
              height,
            }}
            role="gridcell"
            id="cardHover"
            aria-label={`${item.title} ${item.description}`}
            onClick={() => setShow(true)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') return setShow(true);
            }}
            tabIndex={0}
          >
            {item.imageUrl.endsWith('.mov') ||
            item.imageUrl.endsWith('.mp4') ? (
              <video
                src={item.imageUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Image src={item.imageUrl} alt={item.imageUrl} />
            )}
            <div className="content__slate">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.technologies && (
                <p className="d-flex flex-wrap">
                  {item.technologies.map((tech: string, index: number) => (
                    <span key={index} className="d-block mb-1">
                      {tech}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </MansoryItemStyle>

          <SideBarModal
            show={show}
            closeShow={() => setShow(false)}
            size="lg"
            data={item}
          />
        </>
      )}
    </>
  );
};

const MansoryItemStyle = styled(motion.div)`
  margin: 0 0 1.5em;
  position: relative;

  cursor: pointer;
  border-radius: 9px;
  object-fit: cover;
  background-color: var(--button-index);
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  padding: 1.4rem 2rem;
  display: flex;
  align-items: flex-end;
  border-radius: 9px;
  break-inside: avoid;
  
  /* Transitions fluides */
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  /* Ajout des styles pour la vidéo */
  video {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    left: 0 !important;
    top: 0 !important;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover video {
    transform: scale(1.08); /* Zoom effet sur la vidéo au survol comme pour l'image */
  }

  @media (max-width: 758px) {
    padding: 1.4rem 1rem;
  }

  img {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    left: 0 !important;
    top: 0 !important;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.08);
  }

  &:before {
    content: '';
    pointer-events: none;
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: -1;
    background: radial-gradient(
      circle at center center,
      white 10%,
      whitesmoke 11%,
      whitesmoke 100%
    );
  }

  &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    z-index: 1;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.3;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 10%,
      rgb(0 0 0 / 78%) 80%
    );
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover,
  &:focus {
    cursor: none;
    &:after {
      opacity: 1;
    }
    div.content__slate {
      z-index: 999;
      transform: none;
      opacity: 1;
      position: absolute; /* Fixe la position absolue pour qu'il reste calé */
      bottom: 1.4rem;    /* Même valeur que le padding-bottom */
      left: 2rem;        /* Même valeur que le padding-left */
      right: 2rem;       /* Contrainte à droite pour éviter le débordement */
      width: calc(100% - 4rem); /* Largeur contrainte */
    }
  }

  h3 {
    color: #fff;
    font-size: var(--font-x-md);
    font-weight: 800;
  }

  p {
    color: #d5d5d5 !important;
    font-size: calc(var(--font-sm) + 0.9px);
    span {
      background: #696869;
      padding: 4px 10px;
      border-radius: 50px;
      text-transform: capitalize;
      font-size: 11px;
      margin-right: 6px;
      color: #fff;
      font-weight: 500;
    }
  }

  div.content__slate {
    opacity: 0;
    transform: translateY(10%);
    transition: opacity 300ms ease-in-out 0s, transform 300ms ease-in-out 0s;
    position: absolute;  /* Position absolue par défaut aussi */
    bottom: 1.4rem;
    left: 2rem;
    right: 2rem;
    width: calc(100% - 4rem);
  }

  @media (max-width: 585px) {
    &:after {
      opacity: 1 !important;
    }
    div.content__slate {
      z-index: 999 !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }

  @media (max-width: 989px) {
    &:after {
      opacity: 1 !important;
    }
    div.content__slate {
      z-index: 999 !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }

  @media (max-width: 220px) {
    &:after {
      opacity: 1 !important;
    }
    div.content__slate {
      z-index: 999 !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
`;

export default MansoryItem;
