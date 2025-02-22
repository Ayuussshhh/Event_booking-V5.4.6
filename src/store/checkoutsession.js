import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./checkoutsession.css";

const CheckoutPage = () => {
  // Updated event list with fees
  const [events, setEvents] = useState([
    { id: 1, name: "Dance (Solo)", fee: 200 },
    { id: 2, name: "Dance (Duo)", fee: 300 },
    { id: 3, name: "Dance (Group)", fee: 500 },
    { id: 4, name: "Defeat the Defect", fee: 100 },
    { id: 5, name: "Master Chef", fee: 200 },
    { id: 6, name: "Project Competition (S/W)", fee: 500 },
    { id: 7, name: "Project Competition (H/W)", fee: 500 },
    { id: 8, name: "Poster Making Competition", fee: 200 },
    { id: 9, name: "Debate Competition", fee: 100 },
    { id: 10, name: "Pharm - Model & Poster Competition", fee: 250 },
    { id: 11, name: "Codeology", fee: 100 },
    { id: 12, name: "Tic Tac Toe", fee: 50 },
    { id: 13, name: "Blind Coding", fee: 100 },
    { id: 14, name: "Bollywood Bonanza", fee: 200 },
    { id: 15, name: "Science Model Competition (School)", fee: 100 },
    { id: 16, name: "Brand Quiz", fee: 200 },
    { id: 17, name: "Go-Cart", fee: 100 },
    { id: 18, name: "Football 7-a-side", fee: 500 },
    { id: 19, name: "Scavenger Hunt", fee: 150 },
    { id: 20, name: "Snake & Ladder", fee: 50 },
    { id: 21, name: "RoboRace", fee: 500 },
    { id: 22, name: "Kabaddi", fee: 1100 },
    { id: 23, name: "Volleyball", fee: 700 },
    { id: 24, name: "Arm Wrestling", fee: 500 },
    { id: 25, name: "10 Hours Hackathon", fee: 500 },
    { id: 26, name: "Beat the Streat (Rock Band)", fee: 1000 },
    { id: 27, name: "Beat the Streat (Singing)", fee: 200 },
    { id: 28, name: "Rangmanch (Cyber Sentinel)", fee: 500 },
    { id: 29, name: "Open Mic", fee: 200 },
    { id: 30, name: "Sketch Your Imagination", fee: 100 },
    { id: 31, name: "Nutraceutical Food Exhibition", fee: 500 },
    { id: 32, name: "Case Writing Competition", fee: 200 },
    { id: 33, name: "Mehandi Making", fee: 100 },
    { id: 34, name: "Jenga Block", fee: 50 },
    { id: 35, name: "Antakshri Competition", fee: 250 },
    { id: 36, name: "Science Model Competition (College)", fee: 200 },
    { id: 37, name: "Chess", fee: 600 },
    { id: 38, name: "Linefollower", fee: 500 },
    { id: 39, name: "RoboSoccer", fee: 500 },
    { id: 40, name: "Tech Escape Room", fee: 100 },
    { id: 41, name: "Best Out of Waste", fee: 100 },
    { id: 42, name: "Ad Mad Show", fee: 500 },
    { id: 43, name: "CAD Camp", fee: 100 },
    { id: 44, name: "Ramp Walk (Solo)", fee: 250 },
    { id: 45, name: "Ramp Walk (Duo)", fee: 500 },
    { id: 46, name: "Live Painting & Exhibition", fee: 200 },
    { id: 47, name: "Think Tank", fee: 200 },
    { id: 48, name: "HackTrail", fee: 200 },
    { id: 49, name: "Urban Planning", fee: 200 },
    { id: 50, name: "Code Algo", fee: 200 },
    { id: 51, name: "Cricket", fee: 1100 },
    { id: 52, name: "Rifle Shooting", fee: 50 },
    { id: 53, name: "CITRONICS Reel Making", fee: 150 },
    { id: 54, name: "CITRONICS Photography", fee: 150 },
    { id: 55, name: "Gully Cricket", fee: 250 },
    { id: 56, name: "DJ Evening", fee: 100 },
    { id: 57, name: "Balloon Game", fee: 30 },
    { id: 58, name: "1 Minute Game", fee: 30 },
    { id: 59, name: "Roll the Ball", fee: 30 },
    { id: 60, name: "Hand Leg Challenge", fee: 100 }
  ]);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState(null); // Start with null until user is fetched
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user details on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Get auth token from localStorage
    if (token) {
      axios.get('http://localhost:5000/api/user', {
        headers: { 'Authorization': `Bearer ${token}` } // Send token to authenticate
      })
      .then(response => {
        setUser(response.data); // Set user data if the request is successful
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user details.');
      });
    } else {
      setError('User not logged in. Please log in first.');
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    const event = events.find(e => e.id === parseInt(eventId));
    if (event) setPrice(event.fee);
  };

  const handleCheckout = async () => {
    if (!selectedEvent) {
      return alert('Please select an event.');
    }

    if (!user) {
      return alert('User is not logged in. Please sign in to proceed.');
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/create-checkout-session', {
        eventId: selectedEvent,
        userId: user.id,
        quantity
      });

      window.location.href = res.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to initiate checkout.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Event Checkout</h2>

      {/* Event Selection */}
      <label>Select Event:</label>
      <select onChange={(e) => handleEventChange(e.target.value)} value={selectedEvent}>
        <option value="">-- Select Event --</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.name} - ₹{event.fee}
          </option>
        ))}
      </select>

      {/* User Info */}
      {user ? (
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p> // Show loading text if user info is not loaded yet
      )}

      {/* Quantity Selection */}
      <label>Quantity:</label>
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* Price Display */}
      <p><strong>Total Price:</strong> ₹{price * quantity}</p>

      {/* Error and Checkout Button */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default CheckoutPage;
