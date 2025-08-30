import { useLocation, useNavigate } from 'react-router-dom';

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventTitle, amount, ticketId, eventDate, eventLocation } = location.state || {};

  if (!eventTitle) {
    navigate('/');
    return null;
  }

  const downloadTicket = () => {
    alert('Ticket download feature coming soon!');
  };

  return (
    <div style={{ padding: '20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ padding: '30px', maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎫</div>
          <h2 style={{ color: '#00d4ff', marginBottom: '10px' }}>Your Ticket</h2>
          <p style={{ color: '#00ff88', fontWeight: 'bold' }}>Booking Confirmed!</p>
        </div>

        <div style={{ 
          border: '2px dashed #00d4ff', 
          borderRadius: '12px', 
          padding: '25px', 
          marginBottom: '25px',
          background: 'rgba(0, 212, 255, 0.05)'
        }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`TICKET:${ticketId}|EVENT:${eventTitle}|DATE:${eventDate}`)}`}
              alt="Ticket QR Code"
              style={{ 
                width: '150px',
                height: '150px', 
                borderRadius: '8px',
                border: '2px solid #00d4ff'
              }}
            />
            <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: '0.7' }}>Scan this QR code at the venue for entry</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#00d4ff' }}>Event:</strong>
            <p style={{ margin: '5px 0', fontSize: '18px' }}>{eventTitle}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#00d4ff' }}>Date:</strong>
            <p style={{ margin: '5px 0' }}>{eventDate}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#00d4ff' }}>Location:</strong>
            <p style={{ margin: '5px 0' }}>{eventLocation}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#00d4ff' }}>Amount Paid:</strong>
            <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>₹{amount}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#00d4ff' }}>Ticket ID:</strong>
            <p style={{ margin: '5px 0', fontFamily: 'monospace', fontSize: '16px' }}>{ticketId}</p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#00ff88' }}>
              ✓ This is your official ticket. Please show this at the venue.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={downloadTicket}
            className="btn-secondary"
            style={{ flex: 1, padding: '12px' }}
          >
            📥 Download Ticket
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{ flex: 1, padding: '12px' }}
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;