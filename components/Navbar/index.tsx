/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useContext, useCallback, useState } from 'react';
import { AnimatedThemeToggler } from '../AnimatedThemeToggler';
import styled from 'styled-components';
import { useRouter } from 'next/router';

/* -------------------------- Internal Dependencies ------------------------- */
import AppContext from '../Utils/context';

/* ---------------------------- Image Dependency ---------------------------- */
import { Logo } from '../Icons';
import { ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'À propos', href: '/about' },
  { label: 'Projets', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const { show, handleopen, setTheme, closeShow } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.pathname);
  const [suppressHover, setSuppressHover] = useState(false);

  // Sync activePath when route changes (e.g. browser back/forward)
  React.useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const onLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setActivePath('');
      setSuppressHover(true);
      setTimeout(() => setSuppressHover(false), 450);
      setTimeout(() => {
        router.push('/');
        closeShow?.();
        setMobileOpen(false);
      }, 150);
    },
    [closeShow, router]
  );

  const handleNavClick = (href: string) => {
    if (href === router.pathname) return;
    setActivePath('');
    setSuppressHover(true);
    setTimeout(() => setSuppressHover(false), 450);
    setTimeout(() => {
      router.push(href);
      closeShow?.();
      setMobileOpen(false);
    }, 150);
  };

  return (
    <NavWrapper>
      <nav aria-label="Main navigation">
        <ul className="nav-bar">
          <div className="nav-left">
            <a
              href="/"
              className={`logo-link ${spinning ? 'spin' : ''}`}
              aria-label="Hamza Mars Home"
              onClick={(e) => {
                setSpinning(true);
                onLogoClick(e);
                setTimeout(() => setSpinning(false), 600);
              }}
            >
              <Logo />
            </a>
          </div>

          <button
            className="mobile-toggle"
            aria-expanded={mobileOpen}
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Mobile overlay */}
          <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
            <button
              className="mobile-close"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
            {navItems.map(({ href, label }, index) => (
              <React.Fragment key={label}>
                <li className="mobile-nav-item">
                  <button
                    className={`mobile-nav-link ${activePath === href ? 'active' : ''}`}
                    onClick={() => handleNavClick(href)}
                  >
                    <span className="highlight" />
                    <span className="label">{label}</span>
                  </button>
                </li>
              </React.Fragment>
            ))}
            <li className="mobile-nav-item">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button"
              >
                <span className="highlight" />
                <span className="label">CV <ArrowUpRight className="arrow" /></span>
              </a>
            </li>
          </div>

          {/* Desktop nav */}
          <div className="desktop-menu">
            {navItems.map(({ href, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <button
                    className={`nav-link ${activePath === href ? 'active' : ''} ${
                      suppressHover && activePath === href ? 'suppress-hover' : ''
                    }`}
                    onClick={() => handleNavClick(href)}
                  >
                    <span className="highlight" />
                    <span className="label">{label}</span>
                  </button>
                </li>
                {index < navItems.length - 1 && (
                  <span className="separator" aria-hidden="true">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
            <li className="theme-item">
              <AnimatedThemeToggler toggleThemeFn={setTheme} />
            </li>
            <li>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button"
              >
                <span className="highlight" />
                <span className="label">CV <ArrowUpRight className="arrow" /></span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </NavWrapper>
  );
};

const NavWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1030;
  padding: 0;

  nav {
    padding: 0.5rem 1rem;

    @media (min-width: 768px) {
      padding: 1rem 1.5rem;
    }
  }

  .nav-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0.5rem 1rem;
    border-radius: 0 0 0.75rem 0.75rem;
    background: var(--header-bg);
    backdrop-filter: blur(12px);

    @media (min-width: 768px) {
      border-radius: 0.85rem;
      padding: 0.5rem 1.25rem;
    }
  }

  .nav-left {
    display: flex;
    align-items: center;
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s ease;

    svg {
      width: 32px;
      height: 32px;
      path {
        fill: var(--cw);
        transition: fill 0.3s ease;
      }
    }

    &:hover {
      transform: scale(1.08);
      svg path {
        fill: #6c3971;
      }
    }

    &.spin svg {
      animation: logo-spin 0.6s ease;
    }
  }

  @keyframes logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ========== MOBILE TOGGLE ========== */
  .mobile-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;

    @media (min-width: 768px) {
      display: none;
    }

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--cw);
      border-radius: 2px;
      transition: all 0.3s ease;
    }
  }

  /* ========== MOBILE MENU ========== */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5rem;
    background: var(--bg);
    padding: 4rem 2rem 2rem;
    transform: translateX(100%);
    transition: transform 300ms ease-in-out;
    list-style: none;

    &.open {
      transform: translateX(0);
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  .mobile-close {
    position: fixed;
    right: 1.5rem;
    top: 1rem;
    background: none;
    border: none;
    font-size: 1.75rem;
    color: var(--cw);
    cursor: pointer;
    padding: 0.5rem;
    z-index: 51;
  }

  .mobile-nav-item {
    list-style: none;

    &:first-child {
      margin-top: 2rem;
    }
  }

  .mobile-nav-link {
    position: relative;
    display: block;
    overflow: hidden;
    background: none;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    text-align: right;

    .highlight {
      position: absolute;
      inset: 0;
      z-index: 0;
      height: 100%;
      border-radius: 6px;
      background: #6c3971;
      transform: translateY(100%);
      transition: transform 200ms ease-in-out;
    }

    .label {
      position: relative;
      z-index: 1;
      font-size: 2rem;
      font-weight: 800;
      color: var(--cw);
      transition: color 200ms ease-in-out;
    }

    &:hover .highlight {
      transform: translateY(55%);
    }

    &:hover .label {
      color: #fff;
    }

    &.active .highlight {
      transform: translateY(75%);
    }

    &.active:hover .highlight {
      transform: translateY(55%);
    }

    &.active:hover .label {
      color: #fff;
    }
  }

  /* ========== DESKTOP MENU ========== */
  .desktop-menu {
    display: none;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .nav-link {
    position: relative;
    display: block;
    overflow: hidden;
    background: none;
    border: none;
    outline: none;
    padding: 0.35rem 0.85rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: calc(var(--font-sm) + 0.9px);
    font-weight: 700;
    color: var(--cw);
    text-decoration: none;

    .highlight {
      position: absolute;
      inset: 0;
      z-index: 0;
      height: 100%;
      border-radius: 6px;
      background: #6c3971;
      transition: transform 200ms ease-in-out;
      transform: translateY(100%);
    }

    .label {
      position: relative;
      z-index: 1;
      transition: color 200ms ease-in-out;
    }

    &:hover .highlight {
      transform: translateY(0);
    }

    &:hover .label {
      color: #fff;
    }

    &.active .highlight {
      transform: translateY(75%);
    }

    &.active:hover .highlight {
      transform: translateY(0);
    }

    &.active:hover .label {
      color: #fff;
    }

    &.suppress-hover:hover .highlight {
      transform: translateY(75%);
    }

    &.suppress-hover:hover .label {
      color: var(--cw);
    }
  }

  .separator {
    font-size: 2.25rem;
    font-weight: 100;
    line-height: 0;
    color: var(--light-gray);
    user-select: none;
  }

  .theme-item {
    list-style: none;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
  }

  /* ========== CV BUTTON ========== */
  .cv-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    overflow: hidden;
    margin-left: 0.75rem;
    padding: 0.45rem 1.25rem;
    font-size: calc(var(--font-sm) + 0.9px);
    font-weight: 800;
    color: var(--cw);
    background: var(--bg);
    border: 2px solid var(--cw);
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: transform 200ms ease-out;

    .highlight {
      position: absolute;
      inset: 0;
      z-index: 0;
      height: 100%;
      border-radius: 8px;
      background: #6c3971;
      transition: transform 200ms ease-in-out;
      transform: translateY(100%);
    }

    .label {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: color 200ms ease-in-out;
    }

    .arrow {
      width: 18px;
      height: 18px;
      stroke-width: 2.6px;
      transition: transform 200ms ease-in-out;
    }

    &:hover .highlight {
      transform: translateY(0);
    }

    &:hover .label {
      color: #fff;
    }

    &:hover .arrow {
      transform: translate(2px, -2px);
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default Navbar;
