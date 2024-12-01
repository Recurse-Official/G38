const mongoose = require('mongoose');

// Create a Schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['donor', 'seeker', 'admin'], // Role of the user
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false, // Default to false as user is not verified
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

// Hash the user's password before saving to the database
const bcrypt = require('bcrypt');
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check if entered password matches the stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
