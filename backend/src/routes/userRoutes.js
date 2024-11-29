// File: src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/products', adminController.getAllProducts);
// Protected routes
router.use(authMiddleware);
router.get('/user/profile', userController.getProfile);
router.put('/user/profile', userController.updateProfile);

module.exports = router;