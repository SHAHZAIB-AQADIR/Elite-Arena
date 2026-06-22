import React, { useState } from 'react';
// 1. React Router Navigation hook import kiya
import { useNavigate } from 'react-router-dom';

const Sports = () => {
  // Navigation hook initialize kiya
  const navigate = useNavigate();

  // Core Filter States & Booking Modal State
  const [activeFilter, setActiveFilter] = useState('cricket'); 
  const [selectedLocation, setSelectedLocation] = useState('Gulshan-e-Iqbal'); 
  
  // Naya state search query ke liye
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Cricket', 'Futsal', 'Badminton', 'Table Tennis', 'Padel'];
  
  // 15 total locations array
  const locations = [
    'Gulshan-e-Iqbal', 'Johar', 'North Nazimabad', 'North Karachi',
    'DHA', 'Clifton', 'Bahria Town', 'Malir', 'Saddar', 'PECHS', 
    'FB Area', 'Korangi'
  ];

  // Matrix Database: Ab saari 15 locations manually static custom IDs aur structured entries ke sath ready hain
  const courtsData = {
    cricket: {
      'Gulshan-e-Iqbal': [
        { id: 'cricket_gulshan_1', name: 'Gulshan Indoor Arena', src: 'cricket.jpg', price: 'Rs. 2,500/hr' },
        { id: 'cricket_gulshan_2', name: 'Power Play', src: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=500', price: 'Rs. 3,000/hr' },
        { id: 'cricket_gulshan_3', name: 'Indoor Sports Arena', src: 'cricket5.jpg', price: 'Rs. 2,000/hr' },
      ],
      'Johar': [
        { id: 'cricket_johar_1', name: 'Inswing', src: '/cri.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_johar_2', name: 'PlayOut', src: '/cri1.jpeg', price: 'Rs. 2,600/hr' },
        { id: 'cricket_johar_3', name: 'The Arena X', src: '/cri2.jpeg', price: 'Rs. 3,000/hr' },
      ],
      'North Nazimabad': [
        { id: 'cricket_nn_1', name: 'Extreme Sport', src: '/cri3.jpeg', price: 'Rs. 1,800/hr' },
        { id: 'cricket_nn_2', name: 'Power Hitter', src: '/cri4.jpeg', price: 'Rs. 2,300/hr' },
        { id: 'cricket_nn_3', name: 'The Spot', src: '/cri5.jpeg', price: 'Rs. 3,300/hr' },
      ],
      'North Karachi': [
        { id: 'cricket_nk_1', name: 'Dreamer Arena', src: '/cri8.jpeg', price: 'Rs. 3,500/hr' },
        { id: 'cricket_nk_2', name: 'Chayell Extreme Sports', src: '/cri9.jpeg', price: 'Rs. 2,000/hr' },
        { id: 'cricket_nk_3', name: 'Free Hit', src: '/cri10.jpeg', price: 'Rs. 2,500/hr' },
      ],
      'DHA': [
        { id: 'cricket_dha_1', name: 'Legends Arena', src: 'in1.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_dha_2', name: 'DHA Sports Club ', src: 'img1.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_dha_3', name: 'Pro Athletic SKBZ Cricket Ground', src: 'img2.jpg', price: 'Rs. 3,500/hr' },
      ],
      'Clifton': [
        { id: 'Epic Arena', name: 'Clifton Wooden Court', src: 'img3.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_clifton_2', name: 'Clifton Courtyard', src: 'img4.jpg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_clifton_3', name: 'Sport On', src: 'img5.jpg', price: 'Rs. 3,500/hr' },
      ],
      'Bahria Town': [
        { id: 'cricket_bahria_1', name: 'Bahria Grand Stadium', src: 'img5.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_bahria_2', name: 'Bahria Sports Club', src: 'img6.jpg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_bahria_3', name: 'Precinct 11A Sports Complex', src: 'img7.jpg', price: 'Rs. 3,500/hr' },
      ],
      'Malir': [
        { id: 'cricket_malir_1', name: 'Maidan at KMC Sports Complex', src: 'img8.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_malir_2', name: 'The Edge indoor', src: 'indoorsport.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_malir_3', name: 'Indoor Sports Arena', src: 'cri3.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'Saddar': [
        { id: 'cricket_saddar_1', name: 'Nawab Inn', src: 'cri4.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_saddar_2', name: 'FreeHit Indoor, New M.A. Jinnah Rd', src: 'cri5.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_saddar_3', name: "Sports Science Cricket Academy", src: 'cri8.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'PECHS': [
        { id: 'cricket_pechs_1', name: 'The NCG (North Community Ground)', src: 'cri9.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_pechs_2', name: 'Epic Arena', src: 'cri10.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_pechs_3', name: 'Hilltop sports arena', src: 'cri12.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'FB Area': [
        { id: 'cricket_fb_1', name: 'Dreamers Arena', src: 'cricket.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_fb_2', name: 'Velocity by The Sports Club', src: 'cricket2.jpg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_fb_3', name: 'Indoor Sports Arena', src: 'cricket4.jpg', price: 'Rs. 3,500/hr' },
      ],
      
      'Korangi': [
        { id: 'cricket_korangi_1', name: 'SHAN SHAHEED indoor CRICKET CLUB', src: 'img8.jpg', price: 'Rs. 2,200/hr' },
        { id: 'cricket_korangi_2', name: 'MA Cricket Academy', src: 'img5.jpg', price: 'Rs. 2,800/hr' },
        { id: 'cricket_korangi_3', name: 'Hitters Arena', src: 'img1.jpeg', price: 'Rs. 3,500/hr' },
      ],
      
    },
    futsal: {
      'Gulshan-e-Iqbal': [
        { id: 'futsal_gulshan_1', name: 'Fire Ball', src: '/futsal.jpg', price: 'Rs. 3,500/hr' },
        { id: 'futsal_gulshan_2', name: 'The Legacy', src: '/futsal4.jpg', price: 'Rs. 2,500/hr' },
        { id: 'futsal_gulshan_3', name: 'Urban court', src: 'futsal3.jpg', price: 'Rs. 2,800/hr' },
      ],
      'Johar': [
        { id: 'futsal_johar_1', name: 'Dugout', src: '/fot.jpeg', price: 'Rs. 2,500/hr' },
        { id: 'futsal_johar_2', name: 'The Arena X', src: '/fot1.jpeg', price: 'Rs. 3,000/hr' },
        { id: 'futsal_johar_3', name: 'Air Field', src: '/fot2.jpeg', price: 'Rs. 2,600/hr' },
      ],
      'North Nazimabad': [
        { id: 'futsal_nn_1', name: 'Nizari Sports', src: '/fot3.jpeg', price: 'Rs. 2,000/hr' },
        { id: 'futsal_nn_2', name: 'Dribbling Arena', src: '/fot5.jpeg', price: 'Rs. 2,500/hr' },
        { id: 'futsal_nn_3', name: 'Elixir Arena', src: '/fot6.jpeg', price: 'Rs. 3,200/hr' },
      ],
      'North Karachi': [
        { id: 'futsal_nk_1', name: 'Dreamer Arena', src: '/fot.jpeg', price: 'Rs. 3,500/hr' },
        { id: 'futsal_nk_2', name: 'The Cage', src: '/futsal4.jpg', price: 'Rs. 2,700/hr' },
        { id: 'futsal_nk_3', name: 'WSS Arena', src: 'futsal3.jpg', price: 'Rs. 3,000/hr' },
      ],
      'DHA': [
        { id: 'futsal_dha_1', name: 'Badar/Hilal Futsal Court DHA Phase 6', src: 'fu1.jpg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_dha_2', name: 'Ground Zero Khi', src: 'fu2.jpg', price: 'Rs. 2,800/hr' },
        { id: 'futsal_dha_3', name: 'Legends Arena', src: 'fu3.jpg', price: 'Rs. 3,500/hr' },
      ],
      'Clifton': [
        { id: 'futsal_clifton_1', name: 'Epic Arena', src: 'fu4.jpg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_clifton_2', name: 'Sport On', src: 'https://images.unsplash.com/photo-1504305754058-2f08ccd89a0a?q=80&w=500', price: 'Rs. 2,800/hr' },
        { id: 'futsal_clifton_3', name: 'Clifton Courtyard', src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=500', price: 'Rs. 3,500/hr' },
      ],
      'Bahria Town': [
        { id: 'futsal_bahria_1', name: 'Sports Factory', src: 'fu5.webp', price: 'Rs. 2,200/hr' },
        { id: 'futsal_bahria_2', name: 'Precinct 11A Sports Complex', src: 'futsal.jpg', price: 'Rs. 2,800/hr' },
      
      ],
      'Malir': [
        { id: 'futsal_malir_1', name: 'Flex Pakistan', src: 'fot1.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_malir_2', name: 'Maidan at KMC Sports Complex', src: 'fot2.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'futsal_malir_3', name: 'Hilltop sports arena', src: 'fot3.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'Saddar': [
        { id: 'futsal_saddar_1', name: 'Urban Turf Indoor Sports Arena', src: 'fot4.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_saddar_2', name: 'Saddar Pavilion Club', src: 'fot5.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'futsal_saddar_3', name: 'Sportswing', src: 'fot6.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'PECHS': [
        { id: 'futsal_pechs_1', name: 'FreeHit PECHS', src: 'futsal.jpg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_pechs_2', name: 'Airfield Futsal Court', src: 'futsal2.jpg', price: 'Rs. 2,800/hr' },

      ],
      'FB Area': [
        { id: 'futsal_fb_1', name: 'IU Arena By Sportefy', src: 'futsal3.jpg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_fb_2', name: 'Velocity by The Sports Club', src: 'futsal4.jpg', price: 'Rs. 2,800/hr' },

      ],
      
      'Korangi': [
        { id: 'futsal_korangi_1', name: 'Flex Pakistan', src: 'fu1.jpg', price: 'Rs. 2,200/hr' },
        { id: 'futsal_korangi_2', name: 'Sportswing', src: 'futsal6.jpg', price: 'Rs. 2,800/hr' },

      ],
           
    },
    badminton: {
      'Gulshan-e-Iqbal': [
        { id: 'badm_gulshan_1', name: 'Smash Pro', src: 'batminton3.jpg', price: 'Rs. 2,000/hr' },
        { id: 'badm_gulshan_2', name: 'Shuttle Arena', src: 'batminton.jpg', price: 'Rs. 2,500/hr' },
        { id: 'badm_gulshan_3', name: 'Indoor Wooden', src: 'batminton2.jpg', price: 'Rs. 1,800/hr' },
      ],
      'Johar': [
        { id: 'badm_johar_1', name: 'Johar Club', src: 'b1.jpeg', price: 'Rs. 2,500/hr' },
        { id: 'badm_johar_2', name: 'Johar arena', src: 'b2.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'badm_johar_3', name: 'Air-Con', src: 'b3.jpeg', price: 'Rs. 2,500/hr' },
      ],
      'North Nazimabad': [
        { id: 'badm_nn_1', name: 'sindh sports', src: 'batminton3.jpg', price: 'Rs. 3,500/hr' },
        { id: 'badm_nn_2', name: 'gym khana badminton court', src: 'b1.jpeg', price: 'Rs. 2,000/hr' },
        { id: 'badm_nn_3', name: 'power hitter', src: 'batminton2.jpg', price: 'Rs. 2,500/hr' },
      ],
      'North Karachi': [
        { id: 'badm_nk_1', name: 'Deluxe', src: 'batminton3.jpg', price: 'Rs. 2,700/hr' },
        { id: 'badm_nk_2', name: 'pulse arena', src: 'b2.jpeg', price: 'Rs. 2,400/hr' },
        { id: 'badm_nk_3', name: 'Pro Lighting', src: 'batminton2.jpg', price: 'Rs. 3,000/hr' },
      ],
      'DHA': [
        { id: 'badm_dha_1', name: 'Sports Hub', src: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500', price: 'Rs. 2,200/hr' },
        { id: 'badm_dha_2', name: 'AKUH Sports Complex', src: 'm1.jpg', price: 'Rs. 2,800/hr' },
       
      ],
      'Clifton': [
        { id: 'badm_clifton_1', name: 'Sport On', src: 'm2.jpg', price: 'Rs. 2,200/hr' },
        { id: 'badm_clifton_2', name: 'Clifton Courtyard', src: 'm3.jpg', price: 'Rs. 2,800/hr' },
       
      ],
      'Bahria Town': [
        { id: 'badm_bahria_1', name: 'Precinct 11A Sports Complex', src: 'm4.jpg', price: 'Rs. 2,200/hr' },
        { id: 'badm_bahria_2', name: 'Pakistan Sports Board', src: 'm5.jpg', price: 'Rs. 2,800/hr' },
        
      ],
      'Malir': [
        { id: 'badm_malir_1', name: 'Flex Pakistan', src: 'bad7.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'badm_malir_2', name: 'Sportsol', src: 'batminton.jpg', price: 'Rs. 2,800/hr' },
       
      ],
      'Saddar': [
        { id: 'badm_saddar_1', name: 'Muslim Gymkhana Badminton Court', src: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=500', price: 'Rs. 2,200/hr' },
        { id: 'badm_saddar_2', name: 'The Arena X', src: 'batminton2.jpg', price: 'Rs. 2,800/hr' },
       
      ],
      'PECHS': [
        { id: 'badm_pechs_1', name: 'PECHS Society Turf', src: 'batminton3.jpg', price: 'Rs. 2,200/hr' },
        { id: 'badm_pechs_2', name: 'PECHS Multi Ground', src: 'bad.jpeg', price: 'Rs. 2,800/hr' },
        
      ],


    },
    'table tennis': {
      'Gulshan-e-Iqbal': [
        { id: 'tt_gulshan_1', name: 'Spin Master Table 1', src: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500', price: 'Rs. 800/hr' },
        { id: 'tt_gulshan_2', name: 'Ping Pong Corner T2', src: 'tabletenis.jpg', price: 'Rs. 800/hr' },
        { id: 'tt_gulshan_3', name: 'Championship Table 3', src: 'tabletenis2.jpg', price: 'Rs. 1,000/hr' },
      ],
      'Johar': [
        { id: 'tt_johar_1', name: 'Johar Arcade', src: 'bad.jpeg', price: 'Rs. 900/hr' },
        { id: 'tt_johar_2', name: 'Johar Arcade', src: 'bad7.jpeg', price: 'Rx. 1,100/hr' },
        { id: 'tt_johar_3', name: 'Rapid Fire', src: 'tabletenis2.jpg', price: 'Rs. 800/hr' },
      ],
      'North Nazimabad': [
        { id: 'tt_nn_1', name: 'Stiga court', src: 'ba8.jpg', price: 'Rs. 1,100/hr' },
        { id: 'tt_nn_2', name: 'elite training', src: 'bad.jpeg', price: 'Rs. 1,200/hr' },
        { id: 'tt_nn_3', name: 'Pro Match Hub', src: 'tabletenis2.jpg', price: 'Rs. 1,500/hr' },
      ],
      'North Karachi': [
        { id: 'tt_nk_1', name: 'karachi lounge', src: 'ba6.jpg', price: 'Rs. 1,700/hr' },
        { id: 'tt_nk_2', name: 'tennis arena', src: 'tabletenis.jpg', price: 'Rs. 1,000/hr' },
      ],
      'DHA': [
        { id: 'tt_dha_1', name: 'DHA Indoor Turf', src: 'ba5.webp', price: 'Rs. 2,200/hr' },
        { id: 'tt_dha_2', name: 'DHA Multi Dome', src: 'b1.jpeg', price: 'Rs. 2,800/hr' },
      ],
      'Clifton': [
        { id: 'tt_clifton_1', name: 'Clifton Wooden Court', src: 'ba1.jpg', price: 'Rs. 2,200/hr' },
        { id: 'tt_clifton_2', name: 'Clifton Mega Complex', src: 'ba2.jpg', price: 'Rs. 2,800/hr' },
       
      ],
      'Bahria Town': [
        { id: 'tt_bahria_1', name: 'Bahria Grand Stadium', src: 'ba3.jpg', price: 'Rs. 2,200/hr' },
        { id: 'tt_bahria_2', name: 'Bahria Sports Club', src: 'ba4.jpg', price: 'Rs. 2,800/hr' },
       
      ],


    },
    padel: {
      'Gulshan-e-Iqbal': [
        { id: 'padel_gulshan_1', name: 'padel grove', src: 'pad1.jpeg', price: 'Rs. 4,000/hr' },
        { id: 'padel_gulshan_2', name: 'padel pulse', src: 'paddel2.jpg', price: 'Rs. 4,500/hr' },
        { id: 'padel_gulshan_3', name: 'padel garden', src: 'padel.jpg', price: 'Rs. 3,800/hr' },
      ],
      'Johar': [
        { id: 'padel_johar_1', name: 'padel arena', src: 'pad.jpeg', price: 'Rs. 4,500/hr' },
        { id: 'padel_johar_2', name: 'community sports', src: 'paddel2.jpg', price: 'Rs. 5,500/hr' },
        { id: 'padel_johar_3', name: 'padel station', src: 'pad3.jpeg', price: 'Rs. 4,000/hr' },
      ],
      'North Nazimabad': [
        { id: 'padel_nn_1', name: 'gen z sports arena', src: 'pad4.webp', price: 'Rs. 4,800/hr' },
        { id: 'padel_nn_2', name: 'padel club', src: 'pad5.jpeg', price: 'Rs. 5,000/hr' },
        { id: 'padel_nn_3', name: 'smash x', src: 'padel.jpg', price: 'Rs. 5,500/hr' },
      ],
      'North Karachi': [
        { id: 'padel_nk_1', name: 'titans arena', src: 'paddel1.jpg', price: 'Rs. 4,500/hr' },
        { id: 'padel_nk_2', name: 'padel flick', src: 'paddel2.jpg', price: 'Rs. 5,500/hr' },
        { id: 'padel_nk_3', name: 'space padel', src: 'pad6.webp', price: 'Rs. 5,000/hr' },
      ],
      'DHA': [
        { id: 'padel_dha_1', name: 'DHA Indoor Turf', src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=500', price: 'Rs. 2,200/hr' },
        { id: 'padel_dha_2', name: 'DHA Multi Dome', src: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=500', price: 'Rs. 2,800/hr' },
        { id: 'padel_dha_3', name: 'DHA AC Arena', src: 'pa1.webp', price: 'Rs. 3,500/hr' },
      ],
      'Clifton': [
        { id: 'padel_clifton_1', name: 'Clifton Wooden Court', src: 'pa2.jpg', price: 'Rs. 2,200/hr' },
        { id: 'padel_clifton_2', name: 'Clifton Mega Complex', src: 'pa3.jpg', price: 'Rs. 2,800/hr' },
        { id: 'padel_clifton_3', name: 'Clifton AC Arena', src: 'pa4.webp', price: 'Rs. 3,500/hr' },
      ],
      'Bahria Town': [
        { id: 'padel_bahria_1', name: 'Bahria Grand Stadium', src: 'pa5.jpg', price: 'Rs. 2,200/hr' },
        { id: 'padel_bahria_2', name: 'Bahria Sports Club', src: 'pa7.jpg', price: 'Rs. 2,800/hr' },
        { id: 'padel_bahria_3', name: 'Bahria AC Complex', src: 'pa6.webp', price: 'Rs. 3,500/hr' },
      ],
      'Malir': [
        { id: 'padel_malir_1', name: 'Malir Cantonment Turf', src: 'pa8.jpg', price: 'Rs. 2,200/hr' },
        { id: 'padel_malir_2', name: 'Malir Indoor Arena', src: 'pa9.jpg', price: 'Rs. 2,800/hr' },
        { id: 'padel_malir_3', name: 'Malir Thunder Hub', src: 'pa10.jpg', price: 'Rs. 3,500/hr' },
      ],
      'Saddar': [
        { id: 'padel_saddar_1', name: 'Saddar Downtown Dome', src: 'pa11.jpg', price: 'Rs. 2,200/hr' },
        { id: 'padel_saddar_2', name: 'Saddar Pavilion Club', src: 'pad.jpeg', price: 'Rs. 2,800/hr' },
        { id: 'padel_saddar_3', name: 'Saddar Premium AC Center', src: 'pad1.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'PECHS': [
        { id: 'padel_pechs_1', name: 'PECHS Society Turf', src: 'pad3.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'padel_pechs_2', name: 'PECHS Multi Ground', src: 'pad4.webp', price: 'Rs. 2,800/hr' },
        { id: 'padel_pechs_3', name: 'PECHS Extreme Center', src: 'pad5.jpeg', price: 'Rs. 3,500/hr' },
      ],
      'FB Area': [
        { id: 'padel_fb_1', name: 'FB Area Wooden Track', src: 'pad.jpeg', price: 'Rs. 2,200/hr' },
        { id: 'padel_fb_2', name: 'FB Area High Complex', src: 'paddel1.jpg', price: 'Rs. 2,800/hr' },
        { id: 'padel_fb_3', name: 'FB Area AC Complex', src: 'paddel2.jpg', price: 'Rs. 3,500/hr' },
      ],
      
      'Korangi': [
        { id: 'padel_korangi_1', name: 'Korangi Industrial Turf', src: 'padel.jpg', price: 'Rs. 2,200/hr' },
        { id: 'padel_korangi_2', name: 'Korangi Town Pavilion', src: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=500', price: 'Rs. 2,800/hr' },
        { id: 'padel_korangi_3', name: 'Korangi AC Arena', src: 'pa10.jpg', price: 'Rs. 3,500/hr' },
      ],
      
      
    }
  };

  const targetSport = activeFilter.toLowerCase();
  const baseCourts = courtsData[targetSport]?.[selectedLocation] || [];

  // Search Filter Integration
  const filteredCourts = baseCourts.filter(court => 
    court.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: { width: '100%', minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff', padding: '4rem 1rem', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' },
    titleSection: { maxWidth: '1200px', margin: '0 auto 2.5rem auto', textAlign: 'center' },
    heading: { fontSize: '2.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0', color: '#f8fafc' },
    underline: { height: '4px', width: '96px', backgroundColor: '#dc2626', margin: '1rem auto 0 auto', borderRadius: '9999px' },
    description: { color: '#94a3b8', marginTop: '1rem', fontSize: '1rem' },
    searchContainer: { maxWidth: '500px', margin: '0 auto 2rem auto', textAlign: 'center' },
    searchInput: { width: '100%', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' },
    filterTabs: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' },
    locationTabsContainer: { maxWidth: '1000px', margin: '0 auto 3rem auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(30, 41, 59, 0.6)' },
    imageGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    gridItem: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(30, 41, 59, 0.8)', overflow: 'hidden' },
    imageWrapper: { position: 'relative', overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: '#020617' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    priceBadge: { position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: '700', border: '1px solid #1e293b', color: '#ccff00' },
    cardContent: { padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: '1' },
    metaText: { fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' },
    courtTitle: { fontSize: '1.125rem', fontWeight: '700', color: '#ccff00', margin: '0.25rem 0 1rem 0' },
    bookButton: { width: '100%', backgroundColor: '#ccff00', color: 'black', border: 'none', padding: '0.625rem 0', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.975rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' },
    emptyState: { textAlign: 'center', color: '#ccff00', padding: '3rem 0' }
  };

  return (
    <div style={styles.container}>
      
      {/* Title Section */}
      <div style={styles.titleSection}>
        <h1 style={styles.heading}>Arena Gallery</h1>
        <div style={styles.underline}></div>
        <p style={styles.description}>Explore our premium sports sections and high-quality arenas.</p>
      </div>

      {/* Search Bar Component */}
      <div style={styles.searchContainer}>
        <input 
          type="text"
          placeholder="🔍 Search indoor courts by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* 1. Sports Filter Tabs */}
      <div style={styles.filterTabs}>
        {categories.map((category) => {
          const isActive = activeFilter.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category.toLowerCase());
                setSearchQuery(''); 
              }}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isActive ? '#000000' : '#0f172a',
                border: isActive ? '1px solid #ccff00' : '1px solid #1e293b', 
                color: isActive ? '#ccff00' : '#94a3b8', 
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                outline: 'none'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 2. 15 Locations Navigation Menu */}
      <div style={styles.locationTabsContainer}>
        {locations.map((loc) => {
          const isLocActive = selectedLocation.toLowerCase() === loc.toLowerCase();
          return (
            <button
              key={loc}
              onClick={() => {
                setSelectedLocation(loc);
                setSearchQuery(''); 
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: isLocActive ? '#1e293b' : 'rgba(30, 41, 59, 0.2)',
                color: isLocActive ? '#ccff00' : '#94a3b8',
                border: isLocActive ? '1px solid #ccff00' : '1px solid rgba(30, 41, 59, 0.6)',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: isLocActive ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                margin: '0.25rem',
                whiteSpace: 'nowrap'
              }}
            >
              📍 {loc}
            </button>
          );
        })}
      </div>

      {/* 3. Courts Render Layout Grid */}
      <div style={styles.imageGrid}>
        {filteredCourts.map((court) => (
          <div key={court.id} style={styles.gridItem}>
            
            {/* Image Section */}
            <div style={styles.imageWrapper}>
              <img 
                src={court.src} 
                alt={court.name} 
                style={styles.image}
                loading="lazy"
              />
              <div style={styles.priceBadge}>{court.price}</div>
            </div>
            
            {/* Info Section */}
            <div style={styles.cardContent}>
              <div>
                <span style={styles.metaText}>
                  {activeFilter} — {selectedLocation}
                </span>
                <h3 style={styles.courtTitle}>{court.name}</h3>
              </div>
              
              <button 
                onClick={() => {
                  const sportSlug = activeFilter.toLowerCase().replace(' ', '-');
                  const locationSlug = selectedLocation.toLowerCase().replace(' ', '-');
                  
                  navigate(`/book-me?sport=${sportSlug}&service=court&location=${locationSlug}`, { 
                    state: { 
                      sport: activeFilter,
                      location: selectedLocation, 
                      court: court.name,
                      courtImg: court.src,
                      price: court.price 
                    } 
                  });
                }}
                style={styles.bookButton}
              >
                Book Court
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Empty State Fallback */}
      {filteredCourts.length === 0 && (
        <div style={styles.emptyState}>
          No arenas available for this specific combination.
        </div>
      )}

    </div>
  );
};

export default Sports;