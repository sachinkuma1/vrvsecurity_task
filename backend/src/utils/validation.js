// File: src/utils/validation.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  pincode: Joi.string().required(),
  user_type: Joi.string().valid('admin', 'seller', 'buyer').required()
});

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required()
});

const orderSchema = Joi.object({
  product_id: Joi.number().integer().required(),
  product_name: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  pincode: Joi.string().required()
});

module.exports = {
  userSchema,
  productSchema,
  orderSchema
};