import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users');
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${userId}`);
      alert('User approved!');
      setUsers(users.filter(user => user._id !== userId)); // Update UI
    } catch (error) {
      console.log(error);
      alert('Error approving user');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.username} ({user.role})</p>
            <button onClick={() => handleApprove(user._id)}>Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
