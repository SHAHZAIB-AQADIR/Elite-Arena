import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AppLink from '../../utils/navigation';
import './Testimonial.css';

const stars = Array.from({ length: 5 }, (_, i) => i);

export default function Testimonial() {
  return (
    <AnimatedSection className="testimonial" id="testimonial">
      <div className="testimonial__glow" aria-hidden="true" />

      <div className="container testimonial__inner">
        <motion.div
          className="testimonial__stars"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stars.map((i) => (
            <motion.span
              key={i}
              className="testimonial__star"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="testimonial__quote-icon"
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Quote size={48} fill="currentColor" />
        </motion.div>

        <motion.blockquote
          className="testimonial__quote"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Indoor ground but a bit bigger than normal had a great time there. The
          facility is world-class and the lighting is perfect for night sessions.
        </motion.blockquote>

        <motion.footer
          className="testimonial__author"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <cite className="testimonial__name">Mohammed Ahmed</cite>
          <span className="testimonial__role">Professional Player</span>
        </motion.footer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <AppLink to="/book" className="btn btn--purple testimonial__cta">
            Book Your Session
          </AppLink>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
