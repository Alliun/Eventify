import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    category: 'events'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'events');
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEvents(eventList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'events', editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'events'), formData);
      }
      setFormData({ title: '', description: '', date: '', location: '', image: '', category: 'events' });
      fetchEvents();
      alert('Event saved successfully!');
    } catch (error) {
      alert('Error saving event: ' + error.message);
    }
  };

  const editEvent = (event) => {
    setFormData(event);
    setEditingId(event.id);
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
        fetchEvents();
        alert('Event deleted successfully!');
      } catch (error) {
        alert('Error deleting event: ' + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Admin Panel</h2>
      
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '30px', maxWidth: '500px', padding: '25px' }}>
        <h3>{editingId ? 'Edit Event' : 'Add New Event'}</h3>
        <input
          type="text"
          placeholder="🎭 Event Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          style={{ width: '100%', margin: '10px 0' }}
          required
        />
        <textarea
          placeholder="📝 Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          style={{ width: '100%', margin: '10px 0', height: '80px', resize: 'vertical' }}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          style={{ width: '100%', margin: '10px 0' }}
          required
        />
        <input
          type="text"
          placeholder="📍 Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          style={{ width: '100%', margin: '10px 0' }}
          required
        />
        <input
          type="url"
          placeholder="🖼️ Image URL"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          style={{ width: '100%', margin: '10px 0' }}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          style={{ width: '100%', margin: '10px 0' }}
          required
        >
          <option value="events">🎪 Events</option>
          <option value="movies">🎬 Movies</option>
          <option value="stream">📺 Stream</option>
          <option value="sports">⚽ Sports</option>
          <option value="activities">🎯 Activities</option>
        </select>
        <button type="submit" className="btn-success" style={{ padding: '12px 24px', marginRight: '10px' }}>
          {editingId ? '✨ Update Event' : '➕ Add Event'}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => {setEditingId(null); setFormData({ title: '', description: '', date: '', location: '', image: '', category: 'events' });}}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            ❌ Cancel
          </button>
        )}
      </form>

      <h3 style={{ marginBottom: '20px' }}>🎆 Existing Events</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {events.map(event => (
          <div key={event.id} className="card" style={{ padding: '20px' }}>
            <h4 style={{ color: '#00d4ff', marginBottom: '10px' }}>{event.title}</h4>
            <p style={{ marginBottom: '10px', opacity: '0.9' }}>{event.description}</p>
            <p style={{ marginBottom: '5px' }}><strong>📅 Date:</strong> {event.date}</p>
            <p style={{ marginBottom: '5px' }}><strong>📍 Location:</strong> {event.location}</p>
            <p style={{ marginBottom: '15px' }}><strong>🏷️ Category:</strong> {event.category || 'events'}</p>
            <div>
              <button 
                onClick={() => editEvent(event)}
                className="btn-primary"
                style={{ padding: '8px 16px', marginRight: '10px' }}
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => deleteEvent(event.id)}
                className="btn-danger"
                style={{ padding: '8px 16px' }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;