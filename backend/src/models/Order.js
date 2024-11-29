// File: src/models/Order.js
const { DataTypes } = require("sequelize");

const OrderModel = (sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
    rejectReason: {
      type: DataTypes.STRING,
    },
  });
  return Order;
};

module.exports = OrderModel;
