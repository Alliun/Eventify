import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (eventData, ticketId) => {
    const booking = {
      id: ticketId,
      ...eventData,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    setBookings(prev => [...prev, booking]);
  };

  const getBookingsByUser = (userEmail) => {
    return bookings.filter(booking => booking.userEmail === userEmail);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      getBookingsByUser
    }}>
      {children}
    </BookingContext.Provider>
  );
};