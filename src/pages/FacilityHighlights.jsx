import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  Droplet,
  Heart,
  Trophy,
  Star,
  Award,
} from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AppLink from '../../utils/navigation';
import { facilityFilters, facilityCards } from '../../data/content';
import './FacilityHighlights.css';

const iconMap = {
  coffee: Coffee,
  droplet: Droplet,
  heart: Heart,
};

const watermarkMap = {
  star: Star,
  sparkles: Award,
  heart: Heart,
};

export default function FacilityHighlights() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCards =
    activeFilter === 'All'
      ? facilityCards
      : facilityCards.filter((card) => card.filter === activeFilter);

  return (
    <AnimatedSection className="facilities" id="facilities">
      <div className="container">
        <motion.h2
          className="section-title facilities__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Facility Highlights
        </motion.h2>

        <div className="facilities__filters" role="tablist" aria-label="Facility filters">
          {facilityFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`facilities__filter ${activeFilter === filter ? 'facilities__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div className="facilities__grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => {
              const Icon = iconMap[card.icon];
              const Watermark = watermarkMap[card.watermark];

              return (
                <motion.article
                  key={card.id}
                  className="facilities__card glass-card"
                  style={card.image ? { backgroundImage: `url(${card.image})` } : undefined}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  whileHover={{ y: -8, borderColor: 'rgba(123, 97, 255, 0.3)' }}
                >
                  <div className="facilities__card-overlay" aria-hidden="true" />
                  <div className="facilities__card-watermark" aria-hidden="true">
                    <Watermark size={120} strokeWidth={0.5} />
                  </div>

                  <div className="facilities__card-icon">
                    <Icon size={20} />
                  </div>

                  <h3 className="facilities__card-title">{card.title}</h3>
                  <p className="facilities__card-desc">{card.description}</p>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <AppLink
                      to="/book"
                      search={`?service=${card.service}`}
                      className="btn btn--purple facilities__card-btn"
                    >
                      Explore
                    </AppLink>
                  </motion.div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
