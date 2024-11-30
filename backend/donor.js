const baseUrl = 'http://localhost:5000';

document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
  window.location.href = 'index.html';
});

// Handle food upload
document.getElementById('uploadFoodForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const foodData = {
    donorId: 1, // Replace with actual donor ID from login session
    name: document.getElementById('foodName').value,
    type: document.getElementById('foodType').value,
    expiry: document.getElementById('expiryDate').value,
    quantity: document.getElementById('quantity').value,
    location: document.getElementById('location').value,
  };

  const response = await fetch(`${baseUrl}/api/food/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodData),
  });

  const result = await response.json();
  if (response.ok) {
    alert('Food uploaded successfully!');
    loadUploadedFoods();
  } else {
    alert(result.message);
  }
});

// Load uploaded foods
async function loadUploadedFoods() {
  const response = await fetch(`${baseUrl}/api/food/list`);
  const foods = await response.json();

  const uploadedFoodsList = document.getElementById('uploadedFoodsList');
  uploadedFoodsList.innerHTML = '';

  foods.forEach((food) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${food.name} - ${food.quantity} units (Expires on: ${food.expiry})`;
    uploadedFoodsList.appendChild(listItem);
  });
}

// Load data on page load
loadUploadedFoods();
