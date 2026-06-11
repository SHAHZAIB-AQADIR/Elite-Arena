import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Next.js hooks ki jagah standard React Router
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'; // Fix: Changed from @clerk/nextjs
import { navLinks } from '../../data/content';
import AppLink from '../../utils/navigation'; // Fix: Changed from next/link to your original navigation tool
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
          <img 
            src="/logo3.png" 
            alt="Elite Arena Logo" 
            className="navbar__logo-img" 
            style={{ 
              height: '42px', 
              objectFit: 'contain', 
              display: 'block',
              backgroundColor: 'transparent',
              mixBlendMode: 'color-burn' 
            }} 
          />  
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
          <SignedIn>
            <AppLink to="/admin" className={`navbar__link ${pathname === '/admin' ? 'navbar__link--active' : ''}`}>
              Admin Panel
            </AppLink>
          </SignedIn>
        </nav>

        <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="navbar__login" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <AppLink to="/book" className="btn btn--purple navbar__book">
            Book Now
          </AppLink>
        </div>

        <button
          type="button"
          className="navbar__toggle"
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

              <SignedIn>
                <AppLink to="/admin" className="navbar__mobile-link" onClick={closeMobile}>
                  Admin Panel
                </AppLink>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="navbar__mobile-link" style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }} onClick={closeMobile}>
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              
              <AppLink to="/book" className="btn btn--purple navbar__mobile-book" onClick={closeMobile}>
                Book Now
              </AppLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}