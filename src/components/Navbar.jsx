import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <nav style={{ 
      padding: '15px 0px 15px 30px', 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 212, 255, 0.1))',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
      color: 'white',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Left - Categories */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingRight: '60px' }}>
        <Link to="/" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🏠 Home</Link>
        <Link to="/?category=events" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎪 Events</Link>
        <Link to="/?category=movies" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎬 Movies</Link>
        <Link to="/?category=stream" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>📺 Stream</Link>
        <Link to="/?category=sports" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>⚽ Sports</Link>
        <Link to="/?category=activities" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'all 0.3s' }}>🎯 Activities</Link>
      </div>
      
      {/* Center - Logo */}
      <Link to="/" style={{ 
        color: '#00d4ff', 
        textDecoration: 'none', 
        fontSize: '32px', 
        fontWeight: 'bold',
        textShadow: '0 0 15px rgba(0, 212, 255, 0.7)',
        letterSpacing: '2px',
        textAlign: 'center'
      }}>
        ✨ Eventify
      </Link>
      
      {/* Right - Search, Location, User */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '50px' }}>
        <input
          type="text"
          placeholder="🔍 Search events..."
          onChange={(e) => {
            const params = new URLSearchParams(window.location.search);
            if (e.target.value) {
              params.set('search', e.target.value);
            } else {
              params.delete('search');
            }
            window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
            window.dispatchEvent(new Event('popstate'));
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#e0e6ed',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            width: '220px'
          }}
        />
        
        <select 
          onChange={(e) => {
            const params = new URLSearchParams(window.location.search);
            if (e.target.value) {
              params.set('location', e.target.value);
            } else {
              params.delete('location');
            }
            window.location.search = params.toString();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#333',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <option value="" style={{ color: '#666' }}>📍 Select Location</option>
          <option value="new-york">🗽 New York</option>
          <option value="los-angeles">🌴 Los Angeles</option>
          <option value="chicago">🏙️ Chicago</option>
          <option value="miami">🏖️ Miami</option>
          <option value="london">🇬🇧 London</option>
          <option value="paris">🇫🇷 Paris</option>
          <option value="tokyo">🇯🇵 Tokyo</option>
        </select>
        
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Dashboard</Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Admin</Link>
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