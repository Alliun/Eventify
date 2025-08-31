import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroBanner from './HeroBanner';

// Global state for location modal
let globalSetShowLocationModal = null;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('Home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Set global reference
  globalSetShowLocationModal = setShowLocationModal;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const locationFilter = params.get('location');
    const searchQuery = params.get('search');
    
    // Update title based on category
    switch(category) {
      case 'movies': setCurrentTitle('Movies'); break;
      case 'stream': setCurrentTitle('Stream'); break;
      case 'sports': setCurrentTitle('Sports'); break;
      case 'activities': setCurrentTitle('Activities'); break;
      case 'events': setCurrentTitle('Events'); break;
      default: setCurrentTitle('Home'); break;
    }
    
    let filtered = events;
    
    if (category && category !== 'all') {
      filtered = filtered.filter(event => 
        event.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (locationFilter) {
      filtered = filtered.filter(event => 
        event.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, location.search]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category');
      const locationFilter = params.get('location');
      const searchQuery = params.get('search');
      
      let filtered = events;
      
      if (category && category !== 'all') {
        filtered = filtered.filter(event => 
          event.category?.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (locationFilter) {
        filtered = filtered.filter(event => 
          event.location?.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }
      
      if (searchQuery) {
        filtered = filtered.filter(event => 
          event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setFilteredEvents(filtered);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [events]);

  const fetchEvents = async () => {
    // Set sample events directly for demo
    const sampleEvents = [
      {
        id: '1',
        title: 'Summer Music Festival',
        description: 'Join us for an amazing outdoor music festival featuring top artists',
        date: '2024-07-15',
        location: 'Central Park, New York',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=300&fit=crop',
        category: 'events',
        price: 2500
      },
      {
        id: '2',
        title: 'Tech Conference 2024',
        description: 'Latest trends in technology and innovation',
        date: '2024-06-20',
        location: 'Convention Center, San Francisco',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop',
        category: 'events',
        price: 3500
      },
      {
        id: '3',
        title: 'Food & Wine Expo',
        description: 'Taste the finest cuisines and wines from around the world',
        date: '2024-08-10',
        location: 'Miami Beach, Florida',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop',
        category: 'events',
        price: 1800
      },
      {
        id: '4',
        title: 'Marvel Movie Marathon',
        description: 'Watch all Marvel movies back-to-back with fellow fans',
        date: '2024-07-25',
        location: 'IMAX Theater, Los Angeles',
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=300&fit=crop',
        category: 'movies',
        price: 1200
      },
      {
        id: '5',
        title: 'Live Gaming Stream',
        description: 'Watch pro gamers compete in the latest tournaments',
        date: '2024-06-30',
        location: 'Online Stream',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop',
        category: 'stream',
        price: 800
      },
      {
        id: '6',
        title: 'Championship Football',
        description: 'The biggest football match of the season',
        date: '2024-09-15',
        location: 'Wembley Stadium, London',
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop',
        category: 'sports',
        price: 4200
      },
      {
        id: '7',
        title: 'Art Gallery Opening',
        description: 'Contemporary art exhibition featuring local artists',
        date: '2024-08-05',
        location: 'Modern Art Museum, Chicago',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop',
        category: 'activities',
        price: 750
      },
      {
        id: '8',
        title: 'Horror Movie Night',
        description: 'Classic horror films screening under the stars',
        date: '2024-10-31',
        location: 'Drive-in Theater, Austin',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=300&fit=crop',
        category: 'movies',
        price: 950
      },
      {
        id: '9',
        title: 'Basketball Championship',
        description: 'Finals of the city basketball league',
        date: '2024-07-30',
        location: 'Sports Arena, Phoenix',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
        category: 'sports',
        price: 2800
      },
      {
        id: '10',
        title: 'Cooking Workshop',
        description: 'Learn to cook authentic Italian cuisine',
        date: '2024-06-25',
        location: 'Culinary Institute, Boston',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
        category: 'activities',
        price: 1500
      },
      {
        id: '11',
        title: 'Live Podcast Recording',
        description: 'Be part of the audience for a popular tech podcast',
        date: '2024-08-20',
        location: 'Studio, Seattle',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&h=300&fit=crop',
        category: 'stream',
        price: 650
      },
      {
        id: '12',
        title: 'Jazz Concert',
        description: 'Smooth jazz evening with renowned musicians',
        date: '2024-09-10',
        location: 'Blue Note, New Orleans',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
        category: 'events',
        price: 1800
      },
      {
        id: '13',
        title: 'Comedy Show',
        description: 'Stand-up comedy night with top comedians',
        date: '2024-07-12',
        location: 'Comedy Club, Las Vegas',
        image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=500&h=300&fit=crop',
        category: 'events',
        price: 1200
      },
      {
        id: '14',
        title: 'Sci-Fi Movie Marathon',
        description: 'Classic science fiction films all night long',
        date: '2024-08-15',
        location: 'Cinema Complex, Denver',
        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=300&fit=crop',
        category: 'movies',
        price: 1100
      },
      {
        id: '15',
        title: 'Tennis Tournament',
        description: 'Professional tennis championship finals',
        date: '2024-09-05',
        location: 'Tennis Center, Miami',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop',
        category: 'sports',
        price: 3200
      },
      {
        id: '16',
        title: 'Photography Workshop',
        description: 'Learn professional photography techniques',
        date: '2024-06-18',
        location: 'Art Studio, Portland',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop',
        category: 'activities',
        price: 900
      },
      {
        id: '17',
        title: 'Gaming Tournament Stream',
        description: 'Watch the biggest esports tournament live',
        date: '2024-07-08',
        location: 'Online Platform',
        image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500&h=300&fit=crop',
        category: 'stream',
        price: 750
      },
      {
        id: '18',
        title: 'Rock Concert',
        description: 'Heavy metal and rock bands live performance',
        date: '2024-08-25',
        location: 'Stadium, Detroit',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=300&fit=crop',
        category: 'events',
        price: 2900
      },
      {
        id: '19',
        title: 'Documentary Screening',
        description: 'Award-winning nature documentary premiere',
        date: '2024-09-20',
        location: 'Independent Theater, Brooklyn',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
        category: 'movies',
        price: 800
      },
      {
        id: '20',
        title: 'Yoga Retreat',
        description: 'Weekend wellness and meditation retreat',
        date: '2024-10-05',
        location: 'Mountain Resort, Colorado',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
        category: 'activities',
        price: 3800
      },
      {
        id: '21',
        title: 'Fashion Show',
        description: 'Latest fashion trends from top designers',
        date: '2024-09-28',
        location: 'Fashion Week, Milan',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop',
        category: 'events',
        price: 4500
      },
      {
        id: '22',
        title: 'Action Movie Night',
        description: 'Blockbuster action films with surround sound',
        date: '2024-11-15',
        location: 'IMAX Theater, Atlanta',
        image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=300&fit=crop',
        category: 'movies',
        price: 1300
      },
      {
        id: '23',
        title: 'Swimming Championship',
        description: 'Olympic-style swimming competition',
        date: '2024-08-12',
        location: 'Aquatic Center, Orlando',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=300&fit=crop',
        category: 'sports',
        price: 2200
      },
      {
        id: '24',
        title: 'Dance Workshop',
        description: 'Learn salsa and ballroom dancing',
        date: '2024-07-22',
        location: 'Dance Studio, Miami',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=300&fit=crop',
        category: 'activities',
        price: 1100
      },
      {
        id: '25',
        title: 'Live Music Stream',
        description: 'Acoustic sessions with indie artists',
        date: '2024-06-28',
        location: 'Online Concert Hall',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
        category: 'stream',
        price: 550
      },
      {
        id: '26',
        title: 'Wine Tasting',
        description: 'Premium wines from Napa Valley vineyards',
        date: '2024-10-18',
        location: 'Wine Bar, San Francisco',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=300&fit=crop',
        category: 'events',
        price: 2100
      },
      {
        id: '27',
        title: 'Animated Movie Festival',
        description: 'Best animated films from around the world',
        date: '2024-12-10',
        location: 'Animation Theater, Burbank',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
        category: 'movies',
        price: 1000
      },
      {
        id: '28',
        title: 'Marathon Race',
        description: 'City marathon with thousands of participants',
        date: '2024-11-03',
        location: 'Downtown, Boston',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        category: 'sports',
        price: 1600
      },
      {
        id: '29',
        title: 'Pottery Class',
        description: 'Create beautiful ceramic art pieces',
        date: '2024-08-08',
        location: 'Art Center, Santa Fe',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
        category: 'activities',
        price: 850
      },
      {
        id: '30',
        title: 'Virtual Reality Experience',
        description: 'Immersive VR gaming and experiences',
        date: '2024-07-18',
        location: 'VR Arcade, Tokyo',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&h=300&fit=crop',
        category: 'stream',
        price: 1400
      }
    ];
    setEvents(sampleEvents);
  };

  const bookEvent = (event) => {
    if (!user) {
      alert('Please login to book events');
      return;
    }
    navigate('/payment', { 
      state: { 
        eventTitle: event.title, 
        amount: event.price,
        eventDate: event.date,
        eventLocation: event.location
      } 
    });
  };



  return (
    <div>
      <HeroBanner events={events.slice(0, 6)} />
      <div style={{ padding: '20px', maxWidth: '100%', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', color: '#00d4ff' }}>{currentTitle}</h2>
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', width: '100%' }}>
          {filteredEvents.map(event => (
          <div key={event.id} className="card" style={{ padding: '20px' }}>
            {event.image && <img src={event.image} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }} />}
            <h3 style={{ marginBottom: '10px', color: '#00d4ff' }}>{event.title}</h3>
            <p style={{ marginBottom: '5px' }}><strong>📅 Date:</strong> {event.date}</p>
            <p style={{ marginBottom: '5px' }}><strong>📍 Location:</strong> {event.location}</p>
            <p style={{ marginBottom: '20px' }}><strong>💰 Price:</strong> ₹{event.price}</p>
            <button 
              onClick={() => setSelectedEvent(event)}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px', width: '100%', marginBottom: '10px' }}
            >
              ℹ️ More Info
            </button>
            <button 
              onClick={() => {
                if (!user) {
                  alert('Please login to add items to cart');
                  return;
                }
                addToCart(event);
                alert('Added to cart!');
              }}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '14px', width: '100%' }}
            >
              🛒 Add to Cart
            </button>
          </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', opacity: '0.7' }}>
            <h3>No events found</h3>
            <p>Try adjusting your filters or check back later!</p>
          </div>
        )}
        
        {selectedEvent && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div className="card" style={{ 
              padding: '30px', 
              maxWidth: '600px', 
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              {selectedEvent.image && (
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover', 
                    borderRadius: '12px', 
                    marginBottom: '20px' 
                  }} 
                />
              )}
              <h2 style={{ marginBottom: '15px', color: '#00d4ff' }}>{selectedEvent.title}</h2>
              <p style={{ marginBottom: '15px', fontSize: '16px', lineHeight: '1.6' }}>{selectedEvent.description}</p>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '8px' }}><strong>📅 Date:</strong> {selectedEvent.date}</p>
                <p style={{ marginBottom: '8px' }}><strong>📍 Location:</strong> {selectedEvent.location}</p>
                <p style={{ marginBottom: '8px' }}><strong>🏷️ Category:</strong> {selectedEvent.category}</p>
                <p style={{ marginBottom: '8px' }}><strong>💰 Price:</strong> ₹{selectedEvent.price}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    setSelectedEvent(null);
                    bookEvent(selectedEvent);
                  }}
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '14px', flex: '1' }}
                >
                  🎫 Book Event - ₹{selectedEvent.price}
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="btn-secondary"
                  style={{ padding: '12px 24px', fontSize: '14px', flex: '1' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showLocationModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div className="card" style={{ 
              padding: '30px', 
              maxWidth: '500px', 
              width: '90%',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '25px', color: '#00d4ff' }}>Select Location</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                {[
                  { value: 'new-york', label: 'New York', icon: '🗽' },
                  { value: 'los-angeles', label: 'Los Angeles', icon: '🌴' },
                  { value: 'chicago', label: 'Chicago', icon: '🏙️' },
                  { value: 'miami', label: 'Miami', icon: '🏖️' },
                  { value: 'london', label: 'London', icon: '🇬🇧' },
                  { value: 'paris', label: 'Paris', icon: '🇫🇷' },
                  { value: 'tokyo', label: 'Tokyo', icon: '🇯🇵' }
                ].map(city => (
                  <button
                    key={city.value}
                    onClick={() => {
                      const params = new URLSearchParams(window.location.search);
                      params.set('location', city.value);
                      window.location.search = params.toString();
                      setShowLocationModal(false);
                    }}
                    className="btn-secondary"
                    style={{ 
                      padding: '15px 10px', 
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{city.icon}</span>
                    <span>{city.label}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="btn-danger"
                style={{ width: '100%', padding: '12px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;

// Export function to open location modal
export const openLocationModal = () => {
  if (globalSetShowLocationModal) {
    globalSetShowLocationModal(true);
  }
};