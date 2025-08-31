import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';

const Payment = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { addBooking } = useBooking();
  const { user } = useAuth();
  
  const { eventTitle, amount = 1, cartItems, isCartCheckout, eventDate, eventLocation } = location.state || {};
  const defaultUpiId = '7695886223@fam';

  if (!eventTitle) {
    navigate('/');
    return null;
  }

  const upiUrl = `upi://pay?pa=${defaultUpiId}&pn=Eventify&am=${amount}&cu=INR&tn=Payment for ${eventTitle}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  useEffect(() => {
    let timer;
    if (showQR && !paymentEnabled) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setPaymentEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQR, paymentEnabled]);

  const confirmPayment = () => {
    const ticketId = 'TKT' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Add booking to user's bookings
    if (user) {
      if (isCartCheckout && cartItems) {
        // Add each cart item as separate booking
        cartItems.forEach(item => {
          addBooking({
            eventTitle: item.title,
            eventDate: item.date,
            eventLocation: item.location,
            eventImage: item.image,
            amount: item.quantity,
            userEmail: user.email,
            quantity: item.quantity
          }, ticketId + '_' + item.id);
        });
      } else {
        // Single event booking
        addBooking({
          eventTitle,
          eventDate: eventDate || new Date().toLocaleDateString(),
          eventLocation: eventLocation || 'Event Venue',
          amount,
          userEmail: user.email,
          quantity: 1
        }, ticketId);
      }
    }
    
    if (isCartCheckout) {
      clearCart();
    }
    
    navigate('/ticket', {
      state: {
        eventTitle,
        amount,
        ticketId,
        eventDate: eventDate || new Date().toLocaleDateString(),
        eventLocation: eventLocation || 'Event Venue',
        cartItems: cartItems || []
      }
    });
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
        
        <div style={{ marginBottom: '20px', position: 'relative', display: 'inline-block' }}>
          <img 
            src={qrUrl} 
            alt="UPI QR Code" 
            style={{ 
              border: '2px solid #00d4ff', 
              borderRadius: '10px',
              filter: showQR ? 'none' : 'blur(8px)',
              transition: 'filter 0.3s ease'
            }} 
          />
          {!showQR && (
            <button
              onClick={() => setShowQR(true)}
              className="btn-primary"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '10px 20px',
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              Show QR
            </button>
          )}
        </div>
        
        {showQR ? (
          <>
            <p style={{ marginBottom: '10px', fontSize: '16px' }}>
              Scan this QR code with any UPI app to complete payment
            </p>
            <p style={{ marginBottom: '20px', fontSize: '12px', opacity: '0.7' }}>Pay to: {defaultUpiId}</p>
            
            {paymentEnabled ? (
              <button 
                onClick={confirmPayment} 
                className="btn-success"
                style={{ width: '100%', marginBottom: '15px', padding: '12px' }}
              >
                ✓ Payment Done
              </button>
            ) : (
              <p style={{ marginBottom: '15px', fontSize: '16px', color: '#00d4ff' }}>
                Please wait {countdown} seconds to confirm payment...
              </p>
            )}
          </>
        ) : (
          <p style={{ marginBottom: '20px', fontSize: '16px', opacity: '0.7' }}>
            Click "Show QR" to reveal the payment QR code
          </p>
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