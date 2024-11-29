// File: src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user_type: user.user_type });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.update(req.body);
    
    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};