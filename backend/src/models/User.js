// File: src/models/User.js
const { DataTypes } = require("sequelize");

const UserModel = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.ENUM("admin", "seller", "buyer"),
      allowNull: false,
    },
  });
  return User;
};

module.exports = UserModel;
