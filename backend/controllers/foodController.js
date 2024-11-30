const Food = require('./models/Food');
const User = require('./models/User');

 const uploadFood = async (req, res) => {
  const { name, type, expiryDate, location } = req.body;
  const donor = await User.findById(req.user.id);
  if (!donor) {
    return res.status(404).json({ message: 'Donor not found' });
  }

  const newFood = new Food({
    name,
    type,
    expiryDate,
    location,
    donor: donor._id,
  });

  await newFood.save();
  res.status(201).json({ message: 'Food uploaded successfully' });
};

const listFood = async (req, res) => {
  const foods = await Food.find();
  res.status(200).json(foods);
};

const claimFood = async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return res.status(404).json({ message: 'Food not found' });
  }

  const seeker = await User.findById(req.user.id);
  if (!seeker || seeker.role !== 'Seeker') {
    return res.status(400).json({ message: 'Only seekers can claim food' });
  }

  food.claimedBy = seeker._id;
  await food.save();
  res.status(200).json({ message: 'Food claimed successfully' });
};

module.exports = { uploadFood, listFood, claimFood };
