import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, SignInButton } from '@clerk/clerk-react'; 
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
  MapPin,
  Lock, 
  Users,
  ShieldCheck, 
  LifeBuoy,    
} from 'lucide-react';
import {
  sportsCategories,
  sportsContent,
  bookingServices,
  timeSlots,
  images,
} from '../data/content';
import { db } from '../firebase/config'; // Firebase config import kiya
import { collection, addDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import './BookMe.css';

const STEPS = ['Service', 'Details', 'Confirm'];

// Ab saari 12 locations add kar di hain takay gallery routes smoothly handle hon
const LOCATIONS = [
  { id: 'gulshan-e-iqbal', label: 'Gulshan-e-Iqbal' },
  { id: 'johar', label: 'Johar' },
  { id: 'north-nazimabad', label: 'North Nazimabad' },
  { id: 'north-karachi', label: 'North Karachi' },
  { id: 'dha', label: 'DHA' },
  { id: 'clifton', label: 'Clifton' },
  { id: 'bahria-town', label: 'Bahria Town' },
  { id: 'malir', label: 'Malir' },
  { id: 'saddar', label: 'Saddar' },
  { id: 'pechs', label: 'PECHS' },
  { id: 'fb-area', label: 'FB Area' },
  { id: 'korangi', label: 'Korangi' }
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  location: 'gulshan-e-iqbal',
  sport: 'padel',
  service: 'court',
  date: '',
  startTime: '', 
  endTime: '',   
  notes: '',
  courtName: '',
  customPrice: '', 
  customImg: '',   
  teamNeeded: 'not-needed',
};

export default function BookMe() {
  const { isSignedIn } = useAuth(); 
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [allDbBookings, setAllDbBookings] = useState([]); // Database se aane wali bookings save karne ke liye

  // URL Query Params aur Gallery parameters handles karna
  useEffect(() => {
    const galleryData = location.state;

    if (galleryData) {
      const formattedSport = galleryData.sport ? galleryData.sport.toLowerCase().replace(' ', '-') : 'padel';
      setForm((prev) => ({
        ...prev,
        sport: formattedSport,
        service: 'court',
        courtName: galleryData.court || '',
        customPrice: galleryData.price || '', 
        customImg: galleryData.courtImg || '',  
        location: galleryData.location ? galleryData.location.toLowerCase().replace(/ /g, '-') : prev.location,
      }));
    } else {
      const sport = searchParams.get('sport');
      const service = searchParams.get('service') || searchParams.get('facility');
      const locParam = searchParams.get('location');
      const validSport = sport && sportsContent && sportsContent[sport.toLowerCase()] ? sport.toLowerCase() : 'padel';

      setForm((prev) => ({
        ...prev,
        sport: validSport,
        customPrice: '',
        customImg: '',
        ...(service ? { service: service === 'pro-shop' ? 'pro-shop' : service } : {}),
        ...(locParam ? { location: locParam.toLowerCase() } : {}),
      }));
    }
  }, [searchParams, location.state]);

  // Real-time bookings check karne ke liye taake pehle se booked slots hide ho sakein
  useEffect(() => {
    const q = query(collection(db, 'bookings'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = [];
      snapshot.forEach((doc) => {
        bookingsData.push(doc.data());
      });
      setAllDbBookings(bookingsData);
    }, (err) => {
      console.error("Error loading active slots validation data:", err);
    });

    return () => unsubscribe();
  }, []);

  const selectedSport = sportsContent ? sportsContent[form.sport.toLowerCase()] : null;
  const selectedService = bookingServices ? bookingServices.find((s) => s.id === form.service) : null;
  const selectedLocationLabel = LOCATIONS.find((l) => l.id === form.location)?.label || form.location;
  
  const parseTimeStr = (slotStr) => {
    try {
      const startTimeStr = slotStr.split('-')[0].trim();
      let [time, modifier] = startTimeStr.split(' ');
      let [hours, minutes] = time.split(':');
      let hour = parseInt(hours, 10);
      if (modifier === 'PM' && hour !== 12) hour += 12;
      if (modifier === 'AM' && hour === 12) hour = 0;
      return { hour, minute: parseInt(minutes, 10) };
    } catch(e) {
      return { hour: 0, minute: 0 };
    }
  };

  const calculateDurationHours = (startStr, endStr) => {
    if (!startStr || !endStr) return 1; 
    const start = parseTimeStr(startStr);
    const end = parseTimeStr(endStr);
    
    const startInMinutes = start.hour * 60 + start.minute;
    let endInMinutes = end.hour * 60 + end.minute;
    
    if (endInMinutes < startInMinutes) {
      endInMinutes += 24 * 60; 
    }
    
    const diffInHours = (endInMinutes - startInMinutes) / 60;
    return diffInHours > 0 ? diffInHours : 1;
  };

  const price = useMemo(() => {
    const totalHours = calculateDurationHours(form.startTime, form.endTime);
    let baseRate = 45;

    if (form.customPrice && form.service === 'court') {
      const numericCustom = parseInt(form.customPrice.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(numericCustom)) baseRate = numericCustom;
    } else if (form.service === 'coaching') {
      baseRate = (selectedSport?.price || 45) + 30;
    } else if (form.service === 'events') {
      baseRate = 120;
    } else if (form.service === 'pro-shop') {
      return "Free";
    } else {
      baseRate = selectedSport?.price || 45;
    }

    const totalCost = baseRate * totalHours;
    return `RS ${totalCost.toLocaleString()}`;
  }, [form.service, form.sport, form.customPrice, form.startTime, form.endTime, selectedSport]);

  const filteredStartSlots = useMemo(() => {
    const slots = timeSlots || [];
    if (!form.date) return slots;

    const now = new Date();
    const isToday = form.date === now.toISOString().split('T')[0];

    return slots.filter((slot) => {
      const isAlreadyBooked = allDbBookings.some((b) => {
        if (
          b.date === form.date &&
          b.location === form.location && 
          b.courtName === (form.courtName || 'Default Court')
        ) {
          const currentSlotTime = parseTimeStr(slot);
          const bookedStartTime = parseTimeStr(b.startTime);
          const bookedEndTime = parseTimeStr(b.endTime);

          const currentVal = currentSlotTime.hour * 60 + currentSlotTime.minute;
          const startVal = bookedStartTime.hour * 60 + bookedStartTime.minute;
          const endVal = bookedEndTime.hour * 60 + bookedEndTime.minute;

          return currentVal >= startVal && currentVal < endVal;
        }
        return false;
      });

      if (isAlreadyBooked) return false;

      if (isToday) {
        const { hour, minute } = parseTimeStr(slot);
        const slotTimeToday = new Date();
        slotTimeToday.setHours(hour, minute, 0, 0);
        if (now > slotTimeToday) return false;
      }
      return true;
    });
  }, [form.date, form.sport, form.courtName, form.location, allDbBookings]);

  const filteredEndSlots = useMemo(() => {
    if (!form.startTime) return [];
    
    const { hour: startHour, minute: startMin } = parseTimeStr(form.startTime);
    const startTotalMinutes = startHour * 60 + startMin;
    const allSlots = timeSlots || [];

    return allSlots.filter((slot) => {
      if (slot === form.startTime) return false;

      const { hour: endHour, minute: endMin } = parseTimeStr(slot);
      let endTotalMinutes = endHour * 60 + endMin;

      if (endTotalMinutes <= startTotalMinutes) {
        endTotalMinutes += 24 * 60; 
      }

      const durationMinutes = endTotalMinutes - startTotalMinutes;
      return durationMinutes > 0 && durationMinutes <= 5 * 60; 
    });
  }, [form.startTime, timeSlots]);

  const updateField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'startTime') {
        updated.endTime = '';
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 0) {
      if (!form.location) nextErrors.location = 'Select a location branch';
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
      if (!form.startTime) nextErrors.startTime = 'Pick a start time slot';
      if (!form.endTime) nextErrors.endTime = 'Pick an end time slot';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  // Firebase Firestore Integration
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateStep()) return;

    const newBooking = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      sport: form.sport,
      service: form.service,
      courtName: form.courtName || 'Standard Track',
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      teamNeeded: form.teamNeeded,
      notes: form.notes,
      estimatedTotal: price,
      createdAt: serverTimestamp() // Dashboard sort karne ke liye server side timestamp
    };

    try {
      // Firebase cloud par add karne ka method
      await addDoc(collection(db, 'bookings'), newBooking);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error("Firebase save operation failed:", e);
      alert("Database error: Booking save nahi ho saki. Please try again.");
    }
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
            Thanks {form.name}! Your {selectedService?.label ? selectedService.label.toLowerCase() : 'session'} at Elite Arena ({selectedLocationLabel})
            is reserved for {form.date} from **{form.startTime}** to **{form.endTime}**.
          </p>
          
          <div className="book__success-summary glass-card">
            <div><span>Branch Location</span><strong>{selectedLocationLabel}</strong></div>
            <div><span>Court / Arena</span><strong>{form.courtName || 'Standard Track'}</strong></div>
            <div><span>Sport</span><strong>{selectedSport?.title || form.sport}</strong></div>
            <div><span>Service</span><strong>{selectedService?.label || 'Court Rental'}</strong></div>
            <div><span>Duration Slot</span><strong>{form.startTime} - {form.endTime}</strong></div>
            <div><span>Team Needed?</span><strong>{form.teamNeeded === 'needed' ? 'Yes, Matchmaking Required' : 'No, Team Ready'}</strong></div>
            <div><span>Total</span><strong>{price}</strong></div>
          </div>

          <div className="glass-card" style={{ maxWidth: '640px', width: '100%', margin: '1.5rem auto 0', padding: '1.25rem', textAlign: 'left', border: '1px solid rgba(167, 139, 250, 0.15)' }}>
            <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <ShieldCheck size={16} /> Cancellation & Support Terms
            </span>
            <ul style={{ color: '#94a3b8', fontSize: '0.8rem', paddingLeft: '1.2rem', margin: '0', lineHeight: '1.5' }}>
              <li><strong>&gt; 24 Hours Notice:</strong> Eligible for a 100% full refund.</li>
              <li><strong>6 - 24 Hours Notice:</strong> Eligible for a 50% partial refund.</li>
              <li><strong>&lt; 6 Hours Notice:</strong> No refunds will be issued.</li>
              <li>For disputes, use our **In-App Support** system (48-Hour Resolution SLA applies).</li>
            </ul>
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
          <img src={images?.bookHero || ""} alt="" />
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
              <img 
                src={form.customImg || selectedSport?.image || ""} 
                alt="" 
                className="book__preview-img" 
              />
              <div className="book__preview-info">
                <span className="book__preview-sport">
                  {form.courtName || selectedSport?.title || form.sport}
                </span>
                <span className="book__preview-service">{selectedService?.label || 'Court Rental'}</span>
                <span className="book__preview-location" style={{ fontSize: '0.8rem', color: '#a78bfa', display: 'block', marginTop: '4px' }}>
                  📍 {selectedLocationLabel}
                </span>
                {(form.startTime || form.endTime) && (
                  <span className="book__preview-time" style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                    ⏰ {form.startTime || '...'} to {form.endTime || '...'}
                  </span>
                )}
              </div>
            </div>
            <ul className="book__perks">
              <li>Premium equipment included</li>
              <li>24/7 facility access</li>
              <li>Flexible cancelation rules</li>
              <li>Pro coach support available</li>
            </ul>
            <div className="book__price">
              <span>Estimated total</span>
              <strong>{price}</strong>
            </div>
          </aside>

          {!isSignedIn ? (
            <motion.div 
              className="book__form glass-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <div style={{ padding: '1.25rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%', color: '#a78bfa', marginBottom: '1.5rem' }}>
                <Lock size={36} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }}>Login Required</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '360px', marginBottom: '2rem', lineHeight: '1.5' }}>
                Elite Arena par slot reserve karne ke liye aapka logged-in hona zaroori hai. Please pehle login karein.
              </p>
              <SignInButton mode="modal">
                <button type="button" className="btn btn--purple" style={{ padding: '0.75rem 2rem', fontWeight: '600' }}>
                  Sign In to Book Now
                </button>
              </SignInButton>
            </motion.div>
          ) : (
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
                    <h3 className="book__panel-title">Select Location Branch</h3>
                    <div className="book__location-bar" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.4)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      marginBottom: '2rem',
                      alignItems: 'center'
                    }}>
                      {LOCATIONS.map((loc) => {
                        const isActive = form.location === loc.id;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => updateField('location', loc.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border: isActive ? '1px solid #ef4444' : '1px solid transparent',
                              background: isActive ? 'rgba(30, 41, 59, 0.8)' : 'transparent',
                              color: isActive ? '#ef4444' : '#94a3b8',
                              fontWeight: isActive ? '700' : '500',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <span style={{ 
                              color: isActive ? '#ef4444' : '#f43f5e',
                              fontSize: '1rem' 
                            }}>📍</span>
                            {loc.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.location && <p className="book__error">{errors.location}</p>}

                    <h3 className="book__panel-title">Choose Service</h3>
                    <div className="book__service-grid">
                      {bookingServices && bookingServices.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          className={`book__service ${form.service === service.id ? 'book__service--active' : ''}`}
                          onClick={() => {
                            updateField('service', service.id);
                            if (!['court', 'coaching'].includes(service.id)) {
                              updateField('courtName', '');
                              updateField('customPrice', '');
                              updateField('customImg', '');
                            }
                          }}
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
                          {sportsCategories && sportsCategories.map((sport) => (
                            <button
                              key={sport.id}
                              type="button"
                              className={`book__sport ${form.sport === sport.id ? 'book__sport--active' : ''}`}
                              onClick={() => {
                                updateField('sport', sport.id);
                                updateField('courtName', '');
                                updateField('customPrice', '');
                                updateField('customImg', '');
                              }}
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
                      <Clock size={18} /> Start Time Slot
                    </h3>
                    <div className="book__times">
                      {filteredStartSlots.map((slot) => (
                        <button
                          key={`start-${slot}`}
                          type="button"
                          className={`book__time ${form.startTime === slot ? 'book__time--active' : ''}`}
                          onClick={() => updateField('startTime', slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {filteredStartSlots.length === 0 && (
                      <p className="book__error-message" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                        ⚠️ Sorry, all slots are fully booked for this date and branch.
                      </p>
                    )}
                    {errors.startTime && <p className="book__error">{errors.startTime}</p>}

                    {form.startTime && (
                      <>
                        <h3 className="book__panel-title book__panel-title--spaced" style={{ marginTop: '2rem' }}>
                          <Clock size={18} /> End Time Slot
                        </h3>
                        <div className="book__times">
                          {filteredEndSlots.map((slot) => (
                            <button
                              key={`end-${slot}`}
                              type="button"
                              className={`book__time ${form.endTime === slot ? 'book__time--active' : ''}`}
                              onClick={() => updateField('endTime', slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {filteredEndSlots.length === 0 && (
                          <p className="book__error-message" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem' }}>
                            ⚠️ No valid end time available. This time slot is full or overlaps with another booking.
                          </p>
                        )}
                        {errors.endTime && <p className="book__error">{errors.endTime}</p>}
                      </>
                    )}

                    <div className="book__team-section" style={{ marginTop: '2.5rem', background: 'rgba(30, 41, 59, 0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={18} style={{ color: '#a78bfa' }} /> Opponent Team Matchmaking
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                        If you don't have an opposing team to play against, let us know! We will arrange opponents for you.
                      </p>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => updateField('teamNeeded', 'needed')}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            border: form.teamNeeded === 'needed' ? '1px solid #a78bfa' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: form.teamNeeded === 'needed' ? 'rgba(167, 139, 250, 0.15)' : 'transparent',
                            color: form.teamNeeded === 'needed' ? '#c084fc' : '#94a3b8',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          🤝 Yes, Team Needed
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField('teamNeeded', 'not-needed')}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            border: form.teamNeeded === 'not-needed' ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: form.teamNeeded === 'not-needed' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                            color: form.teamNeeded === 'not-needed' ? '#f87171' : '#94a3b8',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          🚫 No, Team Ready
                        </button>
                      </div>
                    </div>

                    <label className="book__field book__field--full" style={{ marginTop: '2rem' }}>
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
                        ['Branch Location', selectedLocationLabel],
                        ['Service', selectedService?.label || 'Court Rental'],
                        ...(form.service === 'court' || form.service === 'coaching'
                          ? [
                              ['Sport', selectedSport?.title || form.sport],
                              ['Arena Name', form.courtName || 'Standard Court'],
                            ]
                          : []),
                        ['Date', form.date],
                        ['Start Time', form.startTime],
                        ['End Time', form.endTime],
                        ['Team Matchmaking', form.teamNeeded === 'needed' ? 'Yes, Required' : 'No, Team Ready'],
                        ['Total Cost', price],
                      ].map(([label, value]) => (
                        <div key={label} className="book__review-row">
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                      <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={18} style={{ color: '#10b981' }} /> Elite Arena Booking Policies
                      </h4>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
                        <div>
                          <span style={{ color: '#34d399', fontWeight: '600', display: 'block' }}>Standard Cancellation Rules:</span>
                          <span style={{ color: '#94a3b8' }}>• Cancel more than 24 hours before the slot for a <strong>100% Full Refund</strong>.</span><br />
                          <span style={{ color: '#94a3b8' }}>• Cancel between 6 to 24 hours before the slot for a <strong>50% Partial Refund</strong>.</span><br />
                          <span style={{ color: '#94a3b8' }}>• Cancellations made under 6 hours notice are <strong>Non-Refundable</strong>.</span>
                        </div>
                        
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.75rem' }}>
                          <span style={{ color: '#60a5fa', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <LifeBuoy size={14} /> Dispute Resolution & In-App Support:
                          </span>
                          <span style={{ color: '#94a3b8' }}>
                            For any transactional issues or timing conflicts, please submit a ticket directly through our <strong>In-App Support</strong> panel. All registered complaints follow a strict <strong>48-Hour Resolution SLA</strong> guarantee.
                          </span>
                        </div>
                      </div>
                    </div>

                    {form.notes && (
                      <p className="book__review-notes" style={{ marginTop: '1.5rem' }}>
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
          )}
        </div>
      </section>
    </main>
  );
}