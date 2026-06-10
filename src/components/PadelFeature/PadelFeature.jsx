import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Users } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AppLink from '../../utils/navigation';
import { sportsContent } from '../../data/content';
import './PadelFeature.css';

const iconMap = {
  trophy: Trophy,
  users: Users,
};

export default function PadelFeature({ activeSport }) {
  const content = sportsContent[activeSport];

  return (
    <AnimatedSection className="padel-feature">
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSport}
            className="padel-feature__grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="padel-feature__image-wrap"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={content.image}
                alt={content.title}
                className="padel-feature__image"
                loading="lazy"
              />
              <span className="padel-feature__badge">New</span>
              <div className="padel-feature__overlay">
                <span className="padel-feature__overlay-accent" />
                <span className="padel-feature__overlay-text">{content.overlay}</span>
              </div>
            </motion.div>

            <div className="padel-feature__content">
              <h2 className="section-title padel-feature__title">{content.title}</h2>
              <p className="padel-feature__desc">{content.description}</p>

              <div className="padel-feature__features">
                {content.features.map(({ icon, label, color }) => {
                  const Icon = iconMap[icon];
                  return (
                    <motion.div
                      key={label}
                      className="padel-feature__feature glass-card"
                      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <span
                        className={`padel-feature__feature-icon padel-feature__feature-icon--${color}`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="padel-feature__feature-label">{label}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="padel-feature__links">
                <motion.div whileHover={{ x: 4 }}>
                  <AppLink
                    to="/"
                    hash="#facilities"
                    className="btn btn--outline-purple padel-feature__link"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </AppLink>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <AppLink
                    to="/book"
                    search={`?sport=${activeSport}`}
                    className="btn btn--purple padel-feature__link"
                  >
                    Book Now
                    <ArrowRight size={16} />
                  </AppLink>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
