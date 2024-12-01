import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeekerDashboard = () => {
  const [foodListings, setFoodListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/food/listings');
        setFoodListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  const handleClaimFood = async (foodId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/food/claim',
        { foodId, claimedBy: 'seeker' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Food claimed successfully!');
    } catch (error) {
      console.log(error);
      alert('Error claiming food.');
    }
  };

  return (
    <div>
      <h2>Seeker Dashboard</h2>
      <div>
        {foodListings.map((food) => (
          <div key={food._id}>
            <h3>{food.name}</h3>
            <p>{food.type}</p>
            <p>{food.expiry}</p>
            <button onClick={() => handleClaimFood(food._id)}>Claim Food</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekerDashboard;
