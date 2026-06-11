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
import './Dashboard.css';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('elite_arena_bookings') || '[]');
        setBookings(stored.sort((a, b) => b.id.localeCompare(a.id)));
      } catch (e) {
        console.error("Error loading bookings:", e);
      }
    };

    fetchBookings();
    window.addEventListener('storage', fetchBookings);
    return () => window.removeEventListener('storage', fetchBookings);
  }, []);

  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updatedBookings = bookings.filter(b => b.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem('elite_arena_bookings', JSON.stringify(updatedBookings));
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
        
        {bookings.length === 0 ? (
          <div className="empty-state">
            <CalendarIcon size={48} className="empty-icon" />
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