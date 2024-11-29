// File: src/controllers/orderController.js
const { Order, User } = require('../models');

const createOrder = async (req, res) => {
  try {
    const { pincode, price, quantity, ...orderData } = req.body;
    
    // Find nearest seller
    const seller = await User.findOne({
      where: {
        user_type: 'seller',
        pincode
      }
    });

    if (!seller) {
      return res.status(404).json({ error: 'No seller found for this pincode' });
    }

    const order = await Order.create({
      ...orderData,
      user_id: req.user.id,
      seller_id: seller.id,
      price,
      quantity,
      totalAmount: price * quantity,
      pincode,
      status: 'pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const where = req.user.user_type === 'seller' 
      ? { seller_id: req.user.id }
      : { user_id: req.user.id };

    const orders = await Order.findAll({ where });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json({
      orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders
};