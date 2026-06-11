import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'; // Clerk Route Security Utilities
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BookMe from './pages/BookMe';
import Login from './pages/Login';
import Contact from './pages/contact';
import Sports from "./pages/gallery"; 
import PaymentForm from './pages/PaymentForm';
import FacilityHighlights from './components/FacilityHighlights/FacilityHighlights';
import Dashboard from './Dashboard';
import './components/layout/Layout.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes (Sab ko bina login ke dikhenge) */}
          <Route index element={<Home />} />
          <Route path="sports" element={<Sports />} />
          <Route path="contact" element={<Contact />} />
          <Route path="payment" element={<PaymentForm />} />
          <Route path="book" element={<BookMe />} />
          <Route path="book-me" element={<BookMe />} />
          <Route path="login" element={<Login />} />
          <Route path="FacilityHighlights" element={<FacilityHighlights />} />
          
          {/* Protected Admin Route Layout */}
          <Route 
            path="admin" 
            element={
              <>
                {/* Agar user signed in hai to Dashboard show hoga */}
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                
                {/* Agar user logged out hai to automatic redirect ho jayega */}
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;