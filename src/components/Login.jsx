import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto', padding: '30px' }}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="✉️ Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', margin: '15px 0' }}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', margin: '15px 0' }}
          required
        />
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', margin: '20px 0', fontSize: '16px' }}>
          {isSignup ? '🚀 Sign Up' : '🔑 Login'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="btn-secondary" style={{ width: '100%', padding: '10px' }}>
        {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
};

export default Login;