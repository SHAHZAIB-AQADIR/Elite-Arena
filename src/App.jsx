import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BookMe from './pages/BookMe';
import Login from './pages/Login';
import Contact from './pages/contact';
import Sports from './pages/Sports';
import FacilityHighlights from './components/FacilityHighlights/FacilityHighlights';
import './components/layout/Layout.css';
// 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sports" element={<Sports />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book" element={<BookMe />} />
          <Route path="login" element={<Login />} />
          <Route path="FacilityHighlights" element={<FacilityHighlights />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
