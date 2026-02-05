/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useContext, useCallback } from 'react';
import { AnimatedThemeToggler } from '../AnimatedThemeToggler';

/* -------------------------- Internal Dependencies ------------------------- */
import { Header } from '../Layout/style';
import Link from '../ActiveLink';
import AppContext from '../Utils/context';

/* ---------------------------- Image Dependency ---------------------------- */
import { Logo, Icon } from '../Icons';

const Navbar = () => {
  const { show, handleopen, setTheme, closeShow } = useContext(AppContext);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const onLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      target.classList.remove('logo-spin');
      // Force reflow so the animation can replay on subsequent clicks
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (target as any).offsetHeight;
      target.classList.add('logo-spin');

      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeShow?.();
    },
    [closeShow]
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
