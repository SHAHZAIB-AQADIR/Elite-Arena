import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToHash } from '../../utils/navigation';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash));
    } else {
      window.scrollTo({ top: 0, behavior: pathname === '/' ? 'auto' : 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
