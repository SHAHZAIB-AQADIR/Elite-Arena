import { useState } from 'react';
import { motion } from 'framer-motion';
import './Sports.css';
import { images } from '../data/content';

const SPORTS = [
  { id: 'padel', label: 'Padel'  },
  { id: 'cricket', label: 'Cricket' },
  { id: 'futsal', label: 'Futsal' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'tabletennis', label: 'Table Tennis' },
];

function SportCard({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="sport-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="sport-card__title">{title}</h3>
      <div className="sport-card__body">{children}</div>
    </motion.section>
  );
}

function Sports3D({ active }) {
  const img = images.sports?.[active] || images.hero;
  return (
    <div className="sports-3d" aria-hidden>
      <div className="cube" style={{ backgroundImage: `url(${img})` }} />
    </div>
  );
}

export default function Sports() {
  const [active, setActive] = useState('padel');

  return (
    <main className="sports-page">
      <header className="sports-hero">
        <motion.h1
          className="sports-hero__title"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Elite Arena — Sports
        </motion.h1>
        <motion.p
          className="sports-hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore our courts and programs. Click a sport to view details, 3D preview and video highlights.
        </motion.p>
        <nav className="sports-tabs" aria-label="Sports tabs">
          {SPORTS.map((s) => (
            <button
              key={s.id}
              className={`sports-tab ${active === s.id ? 'sports-tab--active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="sports-grid container">
        <motion.div
          className="sports-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Sports3D active={active} />
          <div className="sports-video">
            <h4>Highlights</h4>
            <div className="video-wrap">
              <iframe
                src="https://www.youtube.com/embed/3AAdKl1UYZs"
                title="Sports highlight"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        <div className="sports-right">
          <SportCard id="padel" title="Padel">
            <p>
              Fast-paced doubles sport with glass-walled courts. We provide professional padel courts, night
              lighting, and racket rental.
            </p>
            <ul>
              <li>World-class courts</li>
              <li>Pro coaching</li>
              <li>Leagues & events</li>
            </ul>
          </SportCard>

          <SportCard id="cricket" title="Cricket">
            <p>
              All-weather nets and turf for nets practice, coaching sessions and community matches.
            </p>
            <ul>
              <li>Indoor nets</li>
              <li>Ball machine & coaching</li>
              <li>Junior programs</li>
            </ul>
          </SportCard>

          <SportCard id="futsal" title="Futsal">
            <p>
              Competitive futsal courts with sprung floors for safe play and excellent ball control.
            </p>
            <ul>
              <li>League play</li>
              <li>Grass-synthetic turf</li>
              <li>Training sessions</li>
            </ul>
          </SportCard>

          <SportCard id="badminton" title="Badminton">
            <p>
              Dedicated halls with pro nets and lighting, suitable for singles and doubles training.
            </p>
            <ul>
              <li>Pro surfaces</li>
              <li>Coaching clinics</li>
              <li>Equipment rental</li>
            </ul>
          </SportCard>

          <SportCard id="tabletennis" title="Table Tennis">
            <p>
              Fast reflex sport with tournament-grade tables and coaching for all levels.
            </p>
            <ul>
              <li>Competition tables</li>
              <li>Club nights</li>
              <li>Junior lessons</li>
            </ul>
          </SportCard>
        </div>
      </section>
    </main>
  );
}

