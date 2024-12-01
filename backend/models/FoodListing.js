const mongoose = require('mongoose');

const FoodListingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  expiry: { type: Date, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);
