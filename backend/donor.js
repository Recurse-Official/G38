document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('foodName').value.trim();
    const type = document.getElementById('foodType').value.trim();
    const expiry = document.getElementById('expiryDate').value;
    const location = document.getElementById('location').value;
  
    try {
      const response = await fetch('http://localhost:5000/add-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, expiry, location })
      });
  
      const result = await response.json();
      if (response.status === 201) {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Server error. Please try again later.');
    }
  });