const express = require('express');
const { uploadFood, listFood, claimFood } = require('../controllers/foodController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', verifyToken, uploadFood);
router.get('/list', listFood);
router.post('/claim/:id', verifyToken, claimFood);

 module.exports = router;
