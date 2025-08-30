import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center' }}>
        <h2>Please login to view your dashboard</h2>
      </div>
    );
  }
  
  const userBookings = getBookingsByUser(user.email);

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ color: '#00d4ff', fontSize: '2.5rem', marginBottom: '10px' }}>🎯 My Dashboard</h2>
        <p style={{ opacity: '0.8' }}>Welcome back, {user.email}!</p>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00d4ff', marginBottom: '20px' }}>🎫 My Bookings ({userBookings.length})</h3>
        
        {userBookings.length === 0 ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎪</div>
            <h3>No bookings yet!</h3>
            <p style={{ marginBottom: '20px', opacity: '0.7' }}>Start exploring events and make your first booking.</p>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary"
              style={{ padding: '12px 24px' }}
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {userBookings.map(booking => (
              <div key={booking.id} className="card" style={{ padding: '25px' }}>
                {booking.eventImage && (
                  <img 
                    src={booking.eventImage} 
                    alt={booking.eventTitle}
                    style={{ 
                      width: '100%', 
                      height: '150px', 
                      objectFit: 'cover', 
                      borderRadius: '8px', 
                      marginBottom: '15px' 
                    }}
                  />
                )}
                
                <h4 style={{ color: '#00d4ff', marginBottom: '10px' }}>{booking.eventTitle}</h4>
                
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ marginBottom: '5px' }}><strong>📅 Date:</strong> {booking.eventDate}</p>
                  <p style={{ marginBottom: '5px' }}><strong>📍 Location:</strong> {booking.eventLocation}</p>
                  <p style={{ marginBottom: '5px' }}><strong>🎫 Quantity:</strong> {booking.quantity}</p>
                  <p style={{ marginBottom: '5px' }}><strong>💰 Amount:</strong> ₹{booking.amount}</p>
                  <p style={{ marginBottom: '5px' }}><strong>📋 Ticket ID:</strong> <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{booking.id}</span></p>
                  <p style={{ marginBottom: '5px' }}><strong>📆 Booked:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => navigate('/ticket', {
                      state: {
                        eventTitle: booking.eventTitle,
                        amount: booking.amount,
                        ticketId: booking.id,
                        eventDate: booking.eventDate,
                        eventLocation: booking.eventLocation
                      }
                    })}
                    className="btn-primary"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    🎫 View Ticket
                  </button>
                  <button
                    onClick={() => alert('Download feature coming soon!')}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    📥 Download
                  </button>
                </div>
                
                <div style={{ 
                  marginTop: '15px', 
                  padding: '10px', 
                  background: 'rgba(0, 255, 136, 0.1)', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: 'bold' }}>✓ Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;