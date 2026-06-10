import { useState } from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import SportsTabs from '../components/SportsTabs/SportsTabs';
import PadelFeature from '../components/PadelFeature/PadelFeature';
import FacilityHighlights from '../components/FacilityHighlights/FacilityHighlights';
import Contact from '../components/Contact/Contact';
import Testimonial from '../components/Testimonial/Testimonial';
import './Home.css';

export default function Home() {
  const [activeSport, setActiveSport] = useState('padel');

  return (
    <>
      <Hero />
      <About />
      <SportsTabs activeSport={activeSport} onSportChange={setActiveSport} />
      <PadelFeature activeSport={activeSport} />
      <FacilityHighlights />
      <Contact />
      <Testimonial />
    </>
  );
}
