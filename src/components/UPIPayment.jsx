const UPIPayment = ({ eventTitle, amount, onClose }) => {
  const defaultUpiId = '7695886223@fam'; // Default UPI ID
  
  const upiUrl = `upi://pay?pa=${defaultUpiId}&pn=Eventify&am=${amount}&cu=INR&tn=Payment for ${eventTitle}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ padding: '30px', maxWidth: '400px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px' }}>UPI Payment</h3>
        <p style={{ marginBottom: '15px' }}>Event: {eventTitle}</p>
        <p style={{ marginBottom: '20px' }}>Amount: ₹{amount}</p>
        
        <img src={qrUrl} alt="UPI QR Code" style={{ marginBottom: '20px' }} />
        <p style={{ marginBottom: '10px', fontSize: '14px' }}>Scan this QR code with any UPI app to pay</p>
        <p style={{ marginBottom: '20px', fontSize: '12px', opacity: '0.7' }}>Pay to: {defaultUpiId}</p>
        
        <button 
          onClick={() => {
            alert('Payment completed! Thank you for your booking.');
            onClose();
          }}
          className="btn-success" 
          style={{ width: '100%', marginBottom: '10px' }}
        >
          Mark as Paid
        </button>
        
        <button onClick={onClose} className="btn-danger" style={{ width: '100%' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UPIPayment;