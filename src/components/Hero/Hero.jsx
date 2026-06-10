import { motion } from 'framer-motion';
import AppLink from '../../utils/navigation';
import { images } from '../../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <img src={images.hero} alt="" className="hero__bg-image" />
        <div className="hero__overlay" />
        <div className="hero__fade" />
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero__title">
            <span className="hero__title-solid">Elite</span>
            <span className="hero__title-outline">Arena</span>
          </h1>

          <p className="hero__subtitle">
            Experience the future of sports and fitness
          </p>

          <div className="hero__actions">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <AppLink to="/book" className="btn btn--green hero__cta">
                Join the Elite
              </AppLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <AppLink to="/" hash="#about" className="btn btn--outline-purple hero__cta-secondary">
                Learn More
              </AppLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
