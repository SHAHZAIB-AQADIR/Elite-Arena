import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AppLink from '../../utils/navigation';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../ui/SocialIcons';
import { footerQuickLinks, footerServices, socialLinks } from '../../data/content';
import './Footer.css';

const socialIconMap = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

export default function Footer() {
  return (
    <AnimatedSection as="footer" className="footer" id="contact">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <AppLink to="/" className="footer__logo">
              <span className="footer__logo-icon">E</span>
              <span className="footer__logo-text">Elite Arena</span>
            </AppLink>
            <p className="footer__about">
              A premium sports destination where champions train, compete, and
              recover. Experience excellence in every detail.
            </p>
            <div className="footer__social">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIconMap[label];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={label}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(123, 97, 255, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <AppLink to={link.to} hash={link.hash} className="footer__link">
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Services</h3>
            <ul className="footer__links">
              {footerServices.map((link) => (
                <li key={link.label}>
                  <AppLink
                    to={link.to}
                    search={link.search}
                    className="footer__link"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact Us</h3>
            <ul className="footer__contact">
              <li>
                <MapPin size={18} className="footer__contact-icon" />
                <AppLink to="/" hash="#contact" className="footer__contact-link">
                  Shahrah-e-Faisal near MAJU, Elite Arena Karachi, Pakistan
                </AppLink>
              </li>
              <li>
                <Phone size={18} className="footer__contact-icon" />
                <a href="tel:+923001234567" className="footer__contact-link">
                  +92 300 1234567
                </a>
              </li>
            </ul>
            <AppLink to="/book" className="btn btn--green footer__book">
              Book Me
            </AppLink>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Elite Arena. All rights reserved.
          </p>
          <div className="footer__legal">
            <AppLink to="/book" className="footer__legal-link">
              Privacy Policy
            </AppLink>
            <span className="footer__divider">|</span>
            <AppLink to="/book" className="footer__legal-link">
              Terms of Service
            </AppLink>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
