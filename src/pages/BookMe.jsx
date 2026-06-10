import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import {
  sportsCategories,
  sportsContent,
  bookingServices,
  timeSlots,
  images,
} from '../data/content';
import './BookMe.css';

const STEPS = ['Service', 'Details', 'Confirm'];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  sport: 'padel',
  service: 'court',
  date: '',
  time: '',
  notes: '',
};

export default function BookMe() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const sport = searchParams.get('sport');
    const service = searchParams.get('service') || searchParams.get('facility');
    setForm((prev) => ({
      ...prev,
      ...(sport && sportsContent[sport] ? { sport } : {}),
      ...(service ? { service: service === 'pro-shop' ? 'pro-shop' : service } : {}),
    }));
  }, [searchParams]);

  const selectedSport = sportsContent[form.sport];
  const selectedService = bookingServices.find((s) => s.id === form.service);
  const price = useMemo(() => {
    if (form.service === 'coaching') return (selectedSport?.price || 45) + 30;
    if (form.service === 'events') return 120;
    if (form.service === 'pro-shop') return 0;
    if (form.service === 'cafe' || form.service === 'rest-area') return 15;
    return selectedSport?.price || 45;
  }, [form.service, form.sport, selectedSport]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 0) {
      if (!form.service) nextErrors.service = 'Select a service';
      if (['court', 'coaching'].includes(form.service) && !form.sport) {
        nextErrors.sport = 'Select a sport';
      }
    }

    if (step === 1) {
      if (!form.name.trim()) nextErrors.name = 'Name is required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
        nextErrors.email = 'Valid email is required';
      }
      if (!form.phone.trim()) nextErrors.phone = 'Phone is required';
      if (!form.date) nextErrors.date = 'Pick a date';
      if (!form.time) nextErrors.time = 'Pick a time slot';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateStep()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <main className="book book--success">
        <div className="book__success-glow" aria-hidden="true" />
        <motion.div
          className="book__success container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 size={72} className="book__success-icon" />
          </motion.div>
          <h1 className="book__success-title">Booking Confirmed</h1>
          <p className="book__success-text">
            Thanks {form.name}! Your {selectedService?.label.toLowerCase()} at Elite Arena
            is reserved for {form.date} at {form.time}.
          </p>
          <div className="book__success-summary glass-card">
            <div><span>Sport</span><strong>{selectedSport?.title}</strong></div>
            <div><span>Service</span><strong>{selectedService?.label}</strong></div>
            <div><span>Total</span><strong>{price === 0 ? 'Free consultation' : `RS ${price}`}</strong></div>
          </div>
          <div className="book__success-actions">
            <Link to="/" className="btn btn--green">Back to Home</Link>
            <button
              type="button"
              className="btn btn--outline-purple"
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm(initialForm);
              }}
            >
              Book Another
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="book">
      <section className="book__hero">
        <div className="book__hero-bg">
          <img src={images.bookHero} alt="" />
          <div className="book__hero-overlay" />
        </div>
        <div className="container book__hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="book__eyebrow">
              <Sparkles size={14} />
              Reserve Your Session
            </span>
            <h1 className="book__title">
              Book <span className="book__title-accent">Me</span>
            </h1>
            <p className="book__subtitle">
              Secure your court, coaching session, or facility access in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="book__main container">
        <div className="book__steps" aria-label="Booking progress">
          {STEPS.map((label, index) => (
            <div
              key={label}
              className={`book__step ${index <= step ? 'book__step--active' : ''} ${index < step ? 'book__step--done' : ''}`}
            >
              <span className="book__step-num">{index < step ? '✓' : index + 1}</span>
              <span className="book__step-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="book__grid">
          <aside className="book__sidebar glass-card">
            <h2 className="book__sidebar-title">Your Selection</h2>
            <div className="book__preview">
              <img src={selectedSport?.image} alt="" className="book__preview-img" />
              <div className="book__preview-info">
                <span className="book__preview-sport">{selectedSport?.title}</span>
                <span className="book__preview-service">{selectedService?.label}</span>
              </div>
            </div>
            <ul className="book__perks">
              <li>Premium equipment included</li>
              <li>24/7 facility access</li>
              <li>Free cancellation 24h prior</li>
              <li>Pro coach support available</li>
            </ul>
            <div className="book__price">
              <span>Estimated total</span>
              <strong>{price === 0 ? 'Free' : `RS ${price}`}</strong>
            </div>
          </aside>

          <form className="book__form glass-card" onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  className="book__panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="book__panel-title">Choose Service</h3>
                  <div className="book__service-grid">
                    {bookingServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        className={`book__service ${form.service === service.id ? 'book__service--active' : ''}`}
                        onClick={() => updateField('service', service.id)}
                      >
                        <strong>{service.label}</strong>
                        <span>{service.description}</span>
                      </button>
                    ))}
                  </div>
                  {errors.service && <p className="book__error">{errors.service}</p>}

                  {['court', 'coaching'].includes(form.service) && (
                    <>
                      <h3 className="book__panel-title book__panel-title--spaced">Select Sport</h3>
                      <div className="book__sport-grid">
                        {sportsCategories.map((sport) => (
                          <button
                            key={sport.id}
                            type="button"
                            className={`book__sport ${form.sport === sport.id ? 'book__sport--active' : ''}`}
                            onClick={() => updateField('sport', sport.id)}
                          >
                            {sport.label}
                          </button>
                        ))}
                      </div>
                      {errors.sport && <p className="book__error">{errors.sport}</p>}
                    </>
                  )}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  className="book__panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="book__panel-title">Your Details</h3>
                  <div className="book__fields">
                    <label className="book__field">
                      <span><User size={16} /> Full Name</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="John Doe"
                      />
                      {errors.name && <em>{errors.name}</em>}
                    </label>
                    <label className="book__field">
                      <span><Mail size={16} /> Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@email.com"
                      />
                      {errors.email && <em>{errors.email}</em>}
                    </label>
                    <label className="book__field">
                      <span><Phone size={16} /> Phone</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+92 234 567-890"
                      />
                      {errors.phone && <em>{errors.phone}</em>}
                    </label>
                    <label className="book__field">
                      <span><Calendar size={16} /> Date</span>
                      <input
                        type="date"
                        min={minDate}
                        value={form.date}
                        onChange={(e) => updateField('date', e.target.value)}
                      />
                      {errors.date && <em>{errors.date}</em>}
                    </label>
                  </div>

                  <h3 className="book__panel-title book__panel-title--spaced">
                    <Clock size={18} /> Time Slot
                  </h3>
                  <div className="book__times">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`book__time ${form.time === slot ? 'book__time--active' : ''}`}
                        onClick={() => updateField('time', slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="book__error">{errors.time}</p>}

                  <label className="book__field book__field--full">
                    <span>Notes (optional)</span>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Any special requests..."
                    />
                  </label>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  className="book__panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="book__panel-title">Confirm Booking</h3>
                  <div className="book__review">
                    {[
                      ['Name', form.name],
                      ['Email', form.email],
                      ['Phone', form.phone],
                      ['Service', selectedService?.label],
                      ...(form.service === 'court' || form.service === 'coaching'
                        ? [['Sport', selectedSport?.title]]
                        : []),
                      ['Date', form.date],
                      ['Time', form.time],
                      ['Total', price === 0 ? 'Free consultation' : `RS ${price}`],
                    ].map(([label, value]) => (
                      <div key={label} className="book__review-row">
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                  {form.notes && (
                    <p className="book__review-notes">
                      <span>Notes:</span> {form.notes}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="book__actions">
              {step > 0 && (
                <button type="button" className="btn btn--outline-purple" onClick={handleBack}>
                  <ChevronLeft size={16} />
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn btn--purple book__next" onClick={handleNext}>
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className="btn btn--green book__next">
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
