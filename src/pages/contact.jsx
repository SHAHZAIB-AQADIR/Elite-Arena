import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import AppLink from '../utils/navigation';
import { images } from '../data/content';
import './contact.css';

const contactItems = [
  {
    icon: MapPin,
    title: 'Location',
    text: 'Shahrah-e-Faisal near MAJU, Elite Arena Karachi, Pakistan',
  },
  {
    icon: Phone,
    title: 'Phone',
    text: '+92 123 456 7890',
  },
  {
    icon: Mail,
    title: 'Email',
    text: 'hello@elitearena.com',
  },
  {
    icon: Clock,
    title: 'Hours',
    text: 'Mon–Sun · 12:00 PM – 12:00 AM',
  },
];

export default function Contact() {
  return (
    <AnimatedSection className="contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__content">
          <motion.h2
            className="section-title contact__title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact Elite Arena
          </motion.h2>
          <motion.p
            className="contact__subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Have a question about our courts, memberships, events, or bookings? Reach out and our team will help you find the perfect plan.
          </motion.p>

          <div className="contact__cards">
            {contactItems.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                className="contact__card glass-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="contact__card-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="contact__card-title">{title}</p>
                  <p className="contact__card-text">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <AppLink to="/book" className="btn btn--green contact__button">
              Book Your Visit
            </AppLink>
          </motion.div>
        </div>

        <motion.div
          className="contact__image-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <img src={images.contact} alt="Elite Arena front desk" className="contact__image" />
          <div className="contact__image-overlay" aria-hidden="true" />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
