const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);

module.exports = router;