import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center' }}>
        <h2>Please login to view your cart</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center' }}>
        <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>🛒 Your Cart</h2>
        <p>Your cart is empty</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
          style={{ padding: '12px 24px', marginTop: '20px' }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/payment', { 
      state: { 
        eventTitle: `${cartItems.length} Events`, 
        amount: getCartTotal(),
        cartItems: cartItems,
        isCartCheckout: true
      } 
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#00d4ff', marginBottom: '30px', textAlign: 'center' }}>🛒 Your Cart</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cartItems.map(item => (
          <div key={item.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ 
                    width: '100px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                  }}
                />
              )}
              
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#00d4ff', marginBottom: '5px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', opacity: '0.8', marginBottom: '5px' }}>📅 {item.date}</p>
                <p style={{ fontSize: '14px', opacity: '0.8' }}>📍 {item.location}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '14px' }}
                >
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '14px' }}
                >
                  +
                </button>
              </div>
              
              <div style={{ textAlign: 'right', minWidth: '80px' }}>
                <p style={{ fontWeight: 'bold' }}>₹{item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-danger"
                  style={{ padding: '5px 10px', fontSize: '12px', marginTop: '5px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Total: ₹{getCartTotal()}</h3>
          <button
            onClick={clearCart}
            className="btn-secondary"
            style={{ padding: '8px 16px' }}
          >
            Clear Cart
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
            style={{ padding: '12px 24px', flex: 1 }}
          >
            Continue Shopping
          </button>
          <button
            onClick={handleCheckout}
            className="btn-primary"
            style={{ padding: '12px 24px', flex: 1 }}
          >
            Checkout - ₹{getCartTotal()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;