import { useState, useEffect } from 'react';

const HeroBanner = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  return (
    <div style={{
      position: 'relative',
      height: '400px',
      background: currentEvent.image 
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentEvent.image})`
        : 'linear-gradient(135deg, #1a1a2e, #16213e)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      marginBottom: '30px'
    }}>
      <div style={{ maxWidth: '800px', padding: '0 20px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '20px',
          textShadow: '0 4px 8px rgba(0,0,0,0.7)'
        }}>
          {currentEvent.title}
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '30px',
          textShadow: '0 2px 4px rgba(0,0,0,0.7)'
        }}>
          {currentEvent.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
          <span>📅 {currentEvent.date}</span>
          <span>📍 {currentEvent.location}</span>
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        {events.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentIndex ? '#00d4ff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;