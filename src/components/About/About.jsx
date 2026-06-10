import { motion } from 'framer-motion';
import { MapPin, Clock, Users } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { images } from '../../data/content';
import './About.css';

const stats = [
  { icon: MapPin, label: 'Prime Location', color: 'green' },
  { icon: Clock, label: '24/7 Access', color: 'purple' },
  { icon: Users, label: 'Pro Coaches', color: 'green' },
];

export default function About() {
  return (
    <AnimatedSection className="about" id="about">
      <div className="about__bg">
        <img
          src={images.aboutRacket}
          alt=""
          className="about__bg-image"
          loading="lazy"
        />
        <div className="about__bg-overlay" />
      </div>

      <div className="about__inner container">
        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h2 className="section-title about__title">About Us</h2>

          <div className="about__text">
            <p>
              Elite Arena is a next-generation sports destination built for athletes,
              enthusiasts, and professionals who demand excellence. Our state-of-the-art
              facility combines cutting-edge technology with world-class amenities.
            </p>
            <p>
              From padel courts to premium recovery lounges, every detail is designed
              to elevate your performance and redefine what a sports club can be.
            </p>
          </div>

          <div className="about__stats">
            {stats.map(({ icon: Icon, label, color }, i) => (
              <motion.div
                key={label}
                className="about__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className={`about__stat-icon about__stat-icon--${color}`}>
                  <Icon size={18} />
                </span>
                <span className="about__stat-label">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
