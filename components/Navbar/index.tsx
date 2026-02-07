/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useContext, useCallback, useEffect } from 'react';
import { AnimatedThemeToggler } from '../AnimatedThemeToggler';

/* -------------------------- Internal Dependencies ------------------------- */
import { Header } from '../Layout/style';
import Link from '../ActiveLink';
import AppContext from '../Utils/context';

/* ---------------------------- Image Dependency ---------------------------- */
import { Logo, Icon } from '../Icons';

const Navbar = () => {
  const { show, handleopen, setTheme, closeShow } = useContext(AppContext);

  // Scroll fluide personnalisé avec easing
  const smoothScrollTo = useCallback((targetY: number, duration: number = 800) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    // Easing function: easeInOutCubic
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + difference * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // Scroll fluide vers une section avec offset pour la navbar fixe
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    const navbarHeight = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;

    smoothScrollTo(offsetPosition, 900);
  }, [smoothScrollTo]);

  // Intercepter les clics sur les liens anchor dans toute la page
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          scrollToId(id);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [scrollToId]);

  const onLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.classList.remove('logo-spin');
      // Force reflow so the animation can replay on subsequent clicks
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (target as any).offsetHeight;
      target.classList.add('logo-spin');

      smoothScrollTo(0, 800);
      closeShow?.();
    },
    [closeShow, smoothScrollTo]
  );

  return (
    <>
      <Header>
        <nav className="navbar navbar-expand-lg bg-light navbar-light">
          <div className="container">
            <Link
              href="/"
              className="navbar-brand"
              aria-label="Hamza Mars Home"
              tabIndex={show ? -1 : undefined}
              onClick={onLogoClick}
            >
              <Logo />
            </Link>

            <button
              className="navbar-toggler pr-0"
              type="button"
              onClick={handleopen}
              tabIndex={show ? -1 : undefined}
              aria-label="Open Button Toggle"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className={`collapse navbar-collapse  ${show && 'show'}`}
              id="collapsibleNavbar"
            >
              <button
                className="d-block d-md-none close-nav"
                onClick={handleopen}
                type="button"
              >
                <Icon />
              </button>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item hover__bottom d-block d-md-none">
                  <button
                    type="button"
                    className="nav-link"
                    id="cardHover"
                    onClick={() => {
                      closeShow();
                      scrollToId('home');
                    }}
                    aria-label="Go Home"
                    title="Home"
                  >
                    Home
                  </button>
                </li>

                <li className="nav-item hover__bottom">
                  <button
                    type="button"
                    className="nav-link"
                    id="cardHover"
                    onClick={() => {
                      closeShow();
                      scrollToId('projects');
                    }}
                    aria-label="Go To Projects Section"
                    title="Projects"
                  >
                    Projects
                  </button>
                </li>

                <li className="nav-item hover__bottom">
                  <button
                    type="button"
                    className="nav-link"
                    id="cardHover"
                    onClick={() => {
                      closeShow();
                      scrollToId('contact');
                    }}
                    aria-label="Go To Contacts Section"
                    title="Contact"
                  >
                    Contact
                  </button>
                </li>

                <li className="nav-item pl-md-3">
                  <AnimatedThemeToggler toggleThemeFn={setTheme} />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Header>
    </>
  );
};

export default Navbar;
