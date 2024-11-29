// File: src/controllers/sellerController.js
const { Order } = require('../models');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { seller_id: req.user.id }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const respondToOrder = async (req, res) => {
  try {
    const { Accept, RejectReason } = req.body;
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        seller_id: req.user.id
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!Accept && !RejectReason) {
      return res.status(400).json({ error: 'Reject reason is required when rejecting an order' });
    }

    await order.update({
      status: Accept ? 'accepted' : 'rejected',
      rejectReason: Accept ? null : RejectReason
    });

    res.json({
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  respondToOrder
};