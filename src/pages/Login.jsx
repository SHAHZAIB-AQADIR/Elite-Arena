import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, CheckCircle2 } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }
    if (!form.password.trim() || form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setLoggedIn(true);
    }
  };

  return (
    <main className="login">
      <div className="login__glow login__glow--green" aria-hidden="true" />
      <div className="login__glow login__glow--purple" aria-hidden="true" />

      <motion.div
        className="login__card glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {!loggedIn ? (
          <>
            <div className="login__header">
              <span className="login__logo-icon">E</span>
              <h1 className="login__title">Welcome Back</h1>
              <p className="login__subtitle">Sign in to manage your bookings</p>
            </div>

            <form className="login__form" onSubmit={handleSubmit} noValidate>
              <label className="login__field">
                <span><Mail size={16} /> Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@email.com"
                />
                {errors.email && <em>{errors.email}</em>}
              </label>

              <label className="login__field">
                <span><Lock size={16} /> Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                />
                {errors.password && <em>{errors.password}</em>}
              </label>

              <button type="submit" className="btn btn--purple login__submit">
                <LogIn size={16} />
                Sign In
              </button>
            </form>

            <p className="login__footer">
              No account?{' '}
              <Link to="/book" className="login__link">
                Book a session to get started
              </Link>
            </p>
          </>
        ) : (
          <motion.div
            className="login__success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={56} className="login__success-icon" />
            <h2 className="login__success-title">Signed In</h2>
            <p className="login__success-text">
              Welcome back! You&apos;re now logged in as {form.email}.
            </p>
            <div className="login__success-actions">
              <Link to="/book" className="btn btn--green">Book a Session</Link>
              <Link to="/" className="btn btn--outline-purple">Go Home</Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
