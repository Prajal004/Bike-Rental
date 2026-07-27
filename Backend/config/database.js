const { Sequelize } = require('sequelize');
require('dotenv').config();

// Import models
const sequelize = new Sequelize(
  process.env.DB_NAME || 'bikeflow',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// Test Connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully!');
    return true;
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection
};
