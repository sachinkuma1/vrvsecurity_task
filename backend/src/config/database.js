// File: src/config/database.js
const { Sequelize } = require('sequelize');

const initDB = async () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false
  });

  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { initDB };