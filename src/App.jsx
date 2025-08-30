import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BookingProvider>
            <Router>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<EventList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/ticket" element={<Ticket />} />
                </Routes>
              </div>
            </Router>
          </BookingProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;