// File: src/models/index.js
const { Sequelize } = require("sequelize");
const UserModel = require("./User");
const ProductModel = require("./Product");
const OrderModel = require("./Order");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Order = OrderModel(sequelize);

// Define relationships
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "sellerId" });
Order.belongsTo(User, { as: "Seller", foreignKey: "sellerId" });

Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
};
