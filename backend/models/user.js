const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Donor', 'Seeker', 'Admin'], required: true },
  identityProof: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

 module.exports = mongoose.model('User', userSchema);