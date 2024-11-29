// File: src/routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware, sellerOnly } = require('../middleware/auth');
const sellerController = require('../controllers/sellerController');

router.use(authMiddleware);
router.use(sellerOnly);

router.get('/orders', sellerController.getOrders);
router.post('/orders/:id/respond', sellerController.respondToOrder);

module.exports = router;