import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import { ClerkProvider } from '@clerk/clerk-react'; 
import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: pathname === '/' ? 'auto' : 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="layout">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ClerkProvider>
  );
}