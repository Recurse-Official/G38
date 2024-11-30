const baseUrl = 'http://localhost:5000';

document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
  window.location.href = 'index.html';
});

// Load available foods
async function loadAvailableFoods() {
  const response = await fetch(`${baseUrl}/api/food/list`);
  const foods = await response.json();

  const availableFoodsList = document.getElementById('availableFoodsList');
  availableFoodsList.innerHTML = '';

  foods.forEach((food) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${food.name}</strong> - ${food.quantity} units (Expires on: ${food.expiry})
      <button onclick="claimFood(${food.id})">Claim</button>
    `;
    availableFoodsList.appendChild(listItem);
  });
}

// Claim food
async function claimFood(foodId) {
  const response = await fetch(`${baseUrl}/api/food/claim/${foodId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seekerId: 1 }), // Replace with actual seeker ID from login session
  });

  const result = await response.json();
  if (response.ok) {
    alert('Food claimed successfully!');
    loadAvailableFoods();
  } else {
    alert(result.message);
  }
}

// Load data on page load
loadAvailableFoods();
