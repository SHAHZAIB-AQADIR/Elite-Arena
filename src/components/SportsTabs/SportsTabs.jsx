import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import { sportsCategories } from '../../data/content';
import './SportsTabs.css';

export default function SportsTabs({ activeSport, onSportChange }) {
  return (
    <AnimatedSection className="sports-tabs" id="sports">
      <div className="container">
        <div className="sports-tabs__header">
          <motion.h2
            className="section-title sports-tabs__title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Our Sports
          </motion.h2>
          <motion.p
            className="sports-tabs__subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Switch between our premium courts and training experiences to find the sport that suits your pace.
          </motion.p>
        </div>

        <div className="sports-tabs__list" role="tablist" aria-label="Sports categories">
          {sportsCategories.map((sport) => {
            const isActive = activeSport === sport.id;
            return (
              <button
                key={sport.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`sports-tabs__tab ${isActive ? 'sports-tabs__tab--active' : ''}`}
                onClick={() => onSportChange(sport.id)}
              >
                {isActive && (
                  <motion.span
                    className="sports-tabs__indicator"
                    layoutId="sports-tab-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="sports-tabs__label">{sport.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
