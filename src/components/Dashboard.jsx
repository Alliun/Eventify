import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
    const bookingSnapshot = await getDocs(bookingsQuery);
    
    const bookingList = await Promise.all(
      bookingSnapshot.docs.map(async (bookingDoc) => {
        const booking = { id: bookingDoc.id, ...bookingDoc.data() };
        const eventDoc = await getDoc(doc(db, 'events', booking.eventId));
        booking.event = eventDoc.exists() ? eventDoc.data() : null;
        return booking;
      })
    );
    
    setBookings(bookingList);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {bookings.map(booking => (
            <div key={booking.id} className="card" style={{ padding: '20px' }}>
              {booking.event ? (
                <>
                  <h3>{booking.event.title}</h3>
                  <p>{booking.event.description}</p>
                  <p><strong>Date:</strong> {booking.event.date}</p>
                  <p><strong>Location:</strong> {booking.event.location}</p>
                  <p><strong>Booked on:</strong> {booking.bookedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                </>
              ) : (
                <p>Event details not available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;