// File: src/controllers/adminController.js
const { Product, User } = require('../models');
const bcrypt = require('bcryptjs');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      admin_id: req.user.id
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.destroy({
      where: { id: req.params.id }
    });
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSeller = async (req, res) => {
  try {
    const { password, ...sellerData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const seller = await User.create({
      ...sellerData,
      password: hashedPassword,
      user_type: 'seller'
    });

    const sellerWithoutPassword = await User.findByPk(seller.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.status(201).json(sellerWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  createSeller,
  getAllProducts
};