export const navLinks = [
  { label: 'About', to: '/', hash: '#about' },
  { label: 'Sports', to: '/sports' },
  { label: 'Facilities', to: '/FacilityHighlights' },
  { label: 'Book Me', to: '/book' },
  { label: 'Contact', to: '/contact' },
];

// 1. IDs ko short aur exact keys se match kar diya hai
export const sportsCategories = [
  { id: 'padel', label: 'Padel' },
  { id: 'table-tennis', label: 'Table Tennis' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'futsal', label: 'Futsal' },
];

export const sportsContent = {
  padel: {
    title: 'Padel',
    description:
      'Experience the fastest-growing racket sport in the world on our championship-grade padel courts. Glass walls, premium turf, and pro-level lighting create an unmatched playing environment day or night.',
    features: [
      { icon: 'trophy', label: 'World Class Courts', color: 'green' },
      { icon: 'users', label: 'Pro Training', color: 'purple' },
    ],
    image:'/padel.jpg',
    overlay: 'The Padel Experience',
    price: 5000,
  },
  'table-tennis': {
    title: 'Table Tennis',
    description:
      'Smash your way to victory on our professional-grade ITTF approved indoor tables. Perfect bounce, anti-glare surroundings, and premium bats available for ultimate speed matches.',
    features: [
      { icon: 'trophy', label: 'ITTF Approved Tables', color: 'green' },
      { icon: 'users', label: '1v1 & Doubles', color: 'purple' },
    ],
    image:'/tabletenis.jpg',
    overlay: 'The Table Tennis Experience',
    price: 3500,
  },
  cricket: {
    title: 'Cricket',
    description:
      'Step into our premium indoor nets with automatic bowling machines and professional turf pitches. Perfect for practicing your cover drives or group net practice sessions.',
    features: [
      { icon: 'trophy', label: 'Pro Bowling Nets', color: 'green' },
      { icon: 'users', label: 'Group Bookings', color: 'purple' },
    ],
    image:'/cricket.jpg',
    overlay: 'The Cricket Experience',
    price: 4000,
  },
  badminton: {
    title: 'Badminton',
    description:
      'Fly across our dedicated badminton halls with professional nets, cushioned flooring, and climate control for the ultimate shuttlecock experience.',
    features: [
      { icon: 'trophy', label: 'Pro Nets & Floors', color: 'green' },
      { icon: 'users', label: 'League Play', color: 'purple' },
    ],
    image:'/batminton.jpg',
    overlay: 'The Badminton Experience',
    price: 3000,
  },
  futsal: {
    title: 'Futsal',
    description:
      'Experience fast-paced action on high-grade FIFA-quality indoor turf. Perfect for 5-v-5 intense matches, quick passes, and high-energy soccer tournaments.',
    features: [
      { icon: 'trophy', label: 'FIFA Quality Turf', color: 'green' },
      { icon: 'users', label: '5-v-5 Matches', color: 'purple' },
    ],
    image:'/futsal.jpg',
    overlay: 'The Futsal Experience',
    price: 4500,
  },
};

export const facilityFilters = ['All', 'Indoor', 'Outdoor'];

export const facilityCards = [
  {
    id: 'namaz-area',
    title: 'Namaz Area',
    description:
      'A peaceful, dedicated space for prayer and reflection, designed to support comfort and quietness during your visit.',
    icon: 'heart',
    watermark: 'heart',
    filter: 'Indoor',
    service: 'prayer',
    image: '/namaz.jpg', 
  },
 {
    id: 'drinking-water',
    title: 'Hydration Station',
    description:
      'Clean drinking water is available throughout the facility so you can stay refreshed and hydrated during every workout.',
    icon: 'droplet',
    watermark: 'sparkles',
    filter: 'Outdoor',
    service: 'water',
    image: '/hydrationstation.jpg', 
  },
  {
    id: 'restaurant',
    title: 'Arena Bistro',
    description:
      'Enjoy fresh meals, healthy snacks, and energized dining in our premium arena bistro after a hard session.',
    icon: 'coffee',
    watermark: 'star',
    filter: 'Indoor',
    service: 'restaurant',
    image: '/resturant.jpg',
  },
];

export const footerQuickLinks = [
  { label: 'About', to: '/', hash: '#about' },
  { label: 'Sports', to: '/sports' },
  { label: 'Facilities', to: '/', hash: '#facilities' },
  { label: 'Book Me', to: '/book' },
];

export const footerServices = [
  { label: 'Coaching', to: '/book', search: '?service=coaching' },
  { label: 'Events', to: '/book', search: '?service=events' },
  { label: 'Pro Shop', to: '/book', search: '?facility=pro-shop' },
  { label: 'Cafe', to: '/book', search: '?service=cafe' },
];

export const bookingServices = [
  { id: 'court', label: 'Court Rental', description: 'Reserve a premium court' }
]

export const timeSlots = [
  '12.00 AM', '07:00 PM', '08:00 PM', 
  '10:00 PM', '11:00 PM', '12:00 PM', '01:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '09:00 PM',
];

export const images = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80',
  bookHero:
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1920&q=80',
  aboutRacket:
    'https://images.unsplash.com/photo-1622163642999-958049a8a169?auto=format&fit=crop&w=800&q=80',
  contact:
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
  sports: {
    padel:
      'https://images.unsplash.com/photo-1554068865-24cecd4e24b8?auto=format&fit=crop&w=900&q=80',
    cricket:
      'https://images.unsplash.com/photo-1502904550040-7534597429d0?auto=format&fit=crop&w=900&q=80',
    futsal:
      'https://images.unsplash.com/photo-1533097031875-2a0bde0c3b20?auto=format&fit=crop&w=900&q=80',
    tabletennis:
      'https://images.unsplash.com/photo-1586953208448-8fb12f94d3e9?auto=format&fit=crop&w=900&q=80',
    badminton:
      'https://images.unsplash.com/photo-1526406915894-4e3be0f61dbe?auto=format&fit=crop&w=900&q=80',
  },
};

export const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];