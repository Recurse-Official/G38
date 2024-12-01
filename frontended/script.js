// Function to handle navigation between role selection and login page
function navigateTo(role) {
    localStorage.setItem("role", role);
    document.getElementById("role-selection").classList.add("hidden");
    document.getElementById("login-page").classList.remove("hidden");
}

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const role = localStorage.getItem("role");

    if (!role) {
        alert("No role selected!");
        return false;
    }

    document.getElementById("login-page").classList.add("hidden");

    // Show the appropriate dashboard
    document.getElementById(`${role}-page`).classList.remove("hidden");

    if (role === "receiver") {
        loadFoodList();
    }

    return false;
}

// Function to navigate back to role selection
function goBack() {
    const role = localStorage.getItem("role");
    if (role) {
        document.getElementById(`${role}-page`).classList.add("hidden");
    }

    document.getElementById("role-selection").classList.remove("hidden");
    localStorage.removeItem("role");
}

// Function to upload food information
function uploadFood(event) {
    event.preventDefault();

    const foodName = document.getElementById("food-name").value;
    const foodQuantity = document.getElementById("food-quantity").value;
    const foodDescription = document.getElementById("food-description").value;

    if (!foodName || !foodQuantity || !foodDescription) {
        alert("Please fill in all fields.");
        return;
    }

    // Save food information to local storage
    const foodList = JSON.parse(localStorage.getItem("foodList")) || [];
    foodList.push({ foodName, foodQuantity, foodDescription });
    localStorage.setItem("foodList", JSON.stringify(foodList));

    // Display success message
    document.getElementById("upload-status").innerText = "Food uploaded successfully!";
    document.getElementById("donor-form").reset();

    setTimeout(() => {
        document.getElementById("upload-status").innerText = "";
    }, 3000);
}

// Function to load food list for receiver
function loadFoodList() {
    const foodList = JSON.parse(localStorage.getItem("foodList")) || [];
    const foodListContainer = document.getElementById("food-list");

    // Clear the container
    foodListContainer.innerHTML = "";

    if (foodList.length === 0) {
        foodListContainer.innerHTML = "<p>No food items available.</p>";
        return;
    }

    // Populate the container with food items
    foodList.forEach((food, index) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        foodItem.innerHTML = `
            <h3>${food.foodName}</h3>
            <p>Quantity: ${food.foodQuantity} kg</p>
            <p>${food.foodDescription}</p>
        `;
        foodListContainer.appendChild(foodItem);
    });
}
