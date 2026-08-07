const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'motorcycle_rental',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Hero@004',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');
    // ✅ Skip sync
    console.log('✅ Database ready (sync skipped)');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
