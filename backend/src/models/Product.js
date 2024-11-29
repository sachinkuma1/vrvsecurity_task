// File: src/models/Product.js
const { DataTypes } = require("sequelize");

const ProductModel = (sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Product;
};

module.exports = ProductModel;
