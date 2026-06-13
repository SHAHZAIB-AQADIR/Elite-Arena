import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar as CalendarIcon, 
  MapPin, 
  Activity, 
  Trash2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from './firebase/config'; // Aapko firebase configure karna hoga
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import './Dashboard.css';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase se real-time bookings fetch karne ka tareeqa
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = [];
      snapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error("Error loading bookings from Firebase:", error);
      setLoading(false);
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        // Firebase se booking delete karna
        await deleteDoc(doc(db, 'bookings', id));
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Could not delete booking. Try again.");
      }
    }
  };

  const totalBookings = bookings.length;
  const uniqueUsers = new Set(bookings.map(b => b.email)).size;

  return (
    <main className="dashboard-page container">
      {/* Back to Booking Link */}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="dashboard__back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a78bfa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to Booking Form
        </Link>
      </div>

      {/* Dashboard Header */}
      <div className="dashboard__header" style={{ marginBottom: '2.5rem', marginTop: '1.5rem' }}>
        <span className="book__eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} /> Elite Arena Control Center
        </span>
        <h1 className="book__title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
          Admin <span className="book__title-accent">Dashboard</span>
        </h1>
        <p className="book__subtitle">Manage real-time arena track reservations and slots.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="dashboard__stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper purple-icon">
            <Activity size={24} />
          </div>
          <div>
            <span className="stat-label">Total Reservations</span>
            <strong className="stat-count">{totalBookings}</strong>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper green-icon">
            <Users size={24} />
          </div>
          <div>
            <span className="stat-label">Unique Clients</span>
            <strong className="stat-count">{uniqueUsers}</strong>
          </div>
        </div>
      </div>

      {/* Bookings Management Table Layout */}
      <div className="glass-card table-container">
        <h3 className="table-title">Active Bookings List</h3>
        
        {loading ? (
          <div className="empty-state">
            <p>Loading bookings in real-time...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrapper" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <CalendarIcon size={48} className="empty-icon" style={{ color: '#a78bfa' }} />
            </div>
            <p>No bookings available at the moment.</p>
          </div>
        ) : (
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Branch</th>
                <th>Sport / Arena</th>
                <th>Date</th>
                <th>Time Duration</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <td className="client-name">{booking.name}</td>
                  <td className="branch-name">
                    <span>
                      <MapPin size={14} /> {booking.location ? booking.location.replace('-', ' ').toUpperCase() : 'GULSHAN'}
                    </span>
                  </td>
                  <td>
                    <span className="sport-badge">
                      {booking.courtName || (booking.sport ? booking.sport.toUpperCase() : 'COURT')}
                    </span>
                  </td>
                  <td>{booking.date}</td>
                  <td className="time-duration">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="dashboard__delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}