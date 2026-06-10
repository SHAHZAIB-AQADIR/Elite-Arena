import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/content';
import AppLink from '../../utils/navigation';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      className={`navbar ${scrolled || pathname !== '/' ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner container">
        <AppLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">E</span>
          <span className="navbar__logo-text">Elite Arena</span>
        </AppLink>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <AppLink
              key={link.label}
              to={link.to}
              hash={link.hash}
              className={`navbar__link ${pathname === link.to && !link.hash ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </AppLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <AppLink to="/login" className="navbar__login">
            Login
          </AppLink>
          <AppLink to="/book" className="btn btn--purple navbar__book">
            Book Now
          </AppLink>
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="navbar__mobile-nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AppLink
                    to={link.to}
                    hash={link.hash}
                    className="navbar__mobile-link"
                    onClick={closeMobile}
                  >
                    {link.label}
                  </AppLink>
                </motion.div>
              ))}
              <AppLink to="/login" className="navbar__mobile-link" onClick={closeMobile}>
                Login
              </AppLink>
              <AppLink
                to="/book"
                className="btn btn--purple navbar__mobile-book"
                onClick={closeMobile}
              >
                Book Now
              </AppLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
