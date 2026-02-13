import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Github, Linkedin } from '../Icons';

const Footer = () => {
  const navItems = [
    { label: 'À propos', href: '/about' },
    { label: 'Projets', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <FooterStyle>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <Link href="/" className="footer-name-link">
              Hamza Mars
            </Link>
            <span className="big-separator" aria-hidden="true">/</span>
            <p className="copyright">
              © 2026 Hamza Mars
            </p>
          </div>

          <nav className="navigation" aria-label="Footer Navigation">
            <ul className="footer-nav-list">
              {navItems.map(({ href, label }, index) => (
                <React.Fragment key={label}>
                  <li>
                    <Link href={href} className="footer-nav-link">
                      {label}
                    </Link>
                  </li>
                  {index < navItems.length - 1 && (
                    <span className="nav-separator" aria-hidden="true">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>
          
          <div className="socials">
            <a
              href="https://github.com/HamzaMrs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/hamza-m-b41a52306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  padding: 2rem 0;
  margin-top: 3rem;
  
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--header-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color);
    border-radius: 0.85rem;
    padding: 1rem 2rem;
    
    @media (max-width: 991px) {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
      padding: 1.5rem;
    }
  }

  .footer-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .footer-name-link {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.05em;
    color: var(--cw);
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #6c3971;
    }
  }

  .big-separator {
    font-size: 3rem;
    font-weight: 100;
    line-height: 0;
    color: var(--light-gray);
    margin: 0 0.5rem;
    @media (max-width: 480px) {
      display: none;
    }
  }

  .copyright {
    font-size: 0.875rem;
    color: var(--article-color);
    margin: 0;
  }

  .footer-nav-list {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.25rem;
    
    @media (max-width: 480px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .footer-nav-link {
    font-size: 1rem;
    font-weight: 700;
    color: var(--cw);
    text-decoration: none;
    transition: color 0.15s ease;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;

    &:hover {
      color: #6c3971;
    }
  }

  .nav-separator {
    font-size: 2.5rem;
    font-weight: 100;
    color: var(--light-gray);
    line-height: 0;
    margin: 0 0.1rem;
  }

  .socials {
    display: flex;
    gap: 1.25rem;
    
    a {
      color: var(--article-color);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      
      svg {
        width: 22px;
        height: 22px;
        fill: currentColor;
      }

      &:hover {
        color: #6c3971;
        transform: scale(1.1);
      }
    }
  }
`;

export default Footer;
