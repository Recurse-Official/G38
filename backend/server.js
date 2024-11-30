const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// In-memory storage
let users = [];
let foodItems = [];

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Login API
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === role);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Food Upload API
app.post('/donor/upload', (req, res) => {
  const { name, type, quantity, location } = req.body;
  foodItems.push({ id: foodItems.length + 1, name, type, quantity, location, claimed: false });
  res.status(200).json({ message: 'Food uploaded successfully' });
});

// Get Available Food API
app.get('/seeker/foods', (req, res) => {
  res.status(200).json(foodItems.filter(food => !food.claimed));
});

// Claim Food API
app.post('/seeker/claim/:id', (req, res) => {
  const foodId = parseInt(req.params.id, 10);
  const food = foodItems.find(item => item.id === foodId);

  if (food && !food.claimed) {
    food.claimed = true;
    res.status(200).json({ message: 'Food claimed successfully' });
  } else {
    res.status(400).json({ message: 'Food not available or already claimed' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
