/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useContext } from 'react';
import { AnimatedThemeToggler } from '../AnimatedThemeToggler';

/* -------------------------- Internal Dependencies ------------------------- */
import { Header } from '../Layout/style';
import Link from '../ActiveLink';
import AppContext from '../Utils/context';

/* ---------------------------- Image Dependency ---------------------------- */
import { Logo, Icon } from '../Icons';

const Navbar = () => {
  const { show, handleopen, setTheme, closeShow, theme } = useContext(
    AppContext
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
                  <Link
                    href="#home"
                    activeClassName="is-active"
                    className="nav-link"
                    id="cardHover"
                    onClick={closeShow}
                    aria-label="Go Home"
                    title="Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item hover__bottom">
                  <Link
                    href="#projects"
                    activeClassName="is-active"
                    className="nav-link"
                    id="cardHover"
                    onClick={closeShow}
                    aria-label="Go To Projects Section"
                    title="Projects"
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item hover__bottom">
                  <Link
                    href="#contact"
                    activeClassName="is-active"
                    className="nav-link"
                    id="cardHover"
                    onClick={closeShow}
                    aria-label="Go To Contacts Section"
                    title="Contact"
                  >
                    Contact
                  </Link>
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
