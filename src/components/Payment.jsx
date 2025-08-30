import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { eventTitle, amount = 1 } = location.state || {};

  if (!eventTitle) {
    navigate('/');
    return null;
  }

  const generateQR = () => {
    if (!upiId) {
      alert('Please enter UPI ID');
      return;
    }
    setShowQR(true);
  };

  const upiUrl = `upi://pay?pa=${upiId}&pn=Eventify&am=${amount}&cu=INR&tn=Payment for ${eventTitle}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const confirmPayment = () => {
    setPaymentCompleted(true);
  };

  if (paymentCompleted) {
    return (
      <div style={{ padding: '50px 20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ padding: '40px', maxWidth: '500px', textAlign: 'center', width: '100%' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ marginBottom: '20px', color: '#00ff88' }}>Payment Completed!</h2>
          <p style={{ marginBottom: '20px', fontSize: '18px' }}>Your booking for <strong>{eventTitle}</strong> has been confirmed.</p>
          <p style={{ marginBottom: '30px', color: '#00d4ff' }}>Amount Paid: ₹{amount}</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary" 
            style={{ width: '100%', padding: '15px' }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ padding: '40px', maxWidth: '500px', textAlign: 'center', width: '100%' }}>
        <h2 style={{ marginBottom: '30px', color: '#00d4ff' }}>Payment</h2>
        
        <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '10px' }}>{eventTitle}</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00d4ff' }}>₹{amount}</p>
        </div>
        
        {!showQR ? (
          <>
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., user@paytm)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{ width: '100%', marginBottom: '20px', padding: '15px' }}
            />
            <button 
              onClick={generateQR} 
              className="btn-primary" 
              style={{ width: '100%', marginBottom: '15px', padding: '15px' }}
            >
              Generate QR Code
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <img src={qrUrl} alt="UPI QR Code" style={{ border: '2px solid #00d4ff', borderRadius: '10px' }} />
            </div>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>
              Scan this QR code with any UPI app to complete payment
            </p>
            <button 
              onClick={confirmPayment} 
              className="btn-success" 
              style={{ width: '100%', marginBottom: '15px', padding: '12px' }}
            >
              ✓ Payment Done
            </button>
            <button 
              onClick={() => setShowQR(false)} 
              className="btn-secondary" 
              style={{ width: '100%', marginBottom: '15px', padding: '12px' }}
            >
              Change UPI ID
            </button>
          </>
        )}
        
        <button 
          onClick={() => navigate('/')} 
          className="btn-danger" 
          style={{ width: '100%', padding: '12px' }}
        >
          Cancel & Go Back
        </button>
      </div>
    </div>
  );
};

export default Payment;