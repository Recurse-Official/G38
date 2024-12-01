import React, { useState } from 'react';
import axios from 'axios';

const DonorDashboard = () => {
  const [foodData, setFoodData] = useState({ name: '', type: '', expiry: '', location: { lat: '', lng: '' } });

  const handleAddFood = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/food/add',
        { ...foodData, location: { type: 'Point', coordinates: [foodData.location.lng, foodData.location.lat] } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Food item added successfully!');
    } catch (error) {
      console.log(error);
      alert('Error adding food item.');
    }
  };

  return (
    <div>
      <h2>Donor Dashboard</h2>
      <form onSubmit={handleAddFood}>
        <input
          type="text"
          placeholder="Food Name"
          value={foodData.name}
          onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Food Type"
          value={foodData.type}
          onChange={(e) => setFoodData({ ...foodData, type: e.target.value })}
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={foodData.expiry}
          onChange={(e) => setFoodData({ ...foodData, expiry: e.target.value })}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={foodData.location.lat}
          onChange={(e) => setFoodData({ ...foodData, location: { ...foodData.location, lat: e.target.value } })}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={foodData.location.lng}
          onChange={(e) => setFoodData({ ...foodData, location: { ...foodData.location, lng: e.target.value } })}
        />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default DonorDashboard;
