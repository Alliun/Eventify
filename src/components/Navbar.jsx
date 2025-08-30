import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { openLocationModal } from './EventList';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { getCartCount } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <nav style={{ 
      padding: '15px 20px', 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 212, 255, 0.1))',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
      color: 'white',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Left - Categories */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingRight: '20px', flexWrap: 'wrap' }}>
        <Link to="/" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🏠 Home</Link>
        <Link to="/?category=events" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎪 Events</Link>
        <Link to="/?category=movies" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎬 Movies</Link>
        <Link to="/?category=stream" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>📺 Stream</Link>
        <Link to="/?category=sports" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>⚽ Sports</Link>
        <Link to="/?category=activities" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎯 Activities</Link>
        {user && (
          <span style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '500' }}>Hello {user.email} !!!</span>
        )}
      </div>
      
      {/* Center - Logo */}
      <Link to="/" style={{ 
        color: '#00d4ff', 
        textDecoration: 'none', 
        fontSize: '32px', 
        fontWeight: 'bold',
        textShadow: '0 0 15px rgba(0, 212, 255, 0.7)',
        letterSpacing: '2px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-50px'
      }}>
        ✨ Eventify
      </Link>
      
      {/* Right - Location, User */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', flexWrap: 'wrap' }}>
        
        <button
          onClick={openLocationModal}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e0e6ed',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          📍 Select Location
        </button>
        
        {user && (
          <Link
            to="/cart"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#00d4ff',
              padding: '8px',
              borderRadius: '50%',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(0, 212, 255, 0.2)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            🛒
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
        )}
        
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
            {user.email === 'admin@eventify.com' && (
              <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Admin</Link>
            )}
            <button 
              onClick={handleLogout}
              className="btn-danger"
              style={{ 
                padding: '6px 12px', 
                fontSize: '12px'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '8px 16px', textDecoration: 'none', borderRadius: '6px', fontSize: '14px' }}>Login</Link>
        )}
        
        <button
          onClick={toggleTheme}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e0e6ed',
            padding: '8px',
            borderRadius: '50%',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(0, 212, 255, 0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isDark ? '🌙' : '☀️'}
        </button>
        
        <button
          onClick={() => alert('Settings coming soon!')}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e0e6ed',
            padding: '8px',
            borderRadius: '50%',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '20px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(0, 212, 255, 0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ⚙️
        </button>
      </div>
    </nav>
  );
};

export default Navbar;