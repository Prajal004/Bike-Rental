const { Sequelize } = require('sequelize');

// Use admin user instead of postgres
const sequelize = new Sequelize(
  process.env.DB_NAME || 'motorcycle_rental',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'Hero@004',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL Connected successfully');
    
    // Try to sync
    try {
      await sequelize.sync({ alter: true });
      console.log(' Database tables synced');
    } catch (syncError) {
      console.log(' Sync warning:', syncError.message);
      console.log(' Database connection ready (tables may need manual creation)');
    }
  } catch (error) {
    console.error(' PostgreSQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
