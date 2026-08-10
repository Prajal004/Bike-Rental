const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'motorcycle_rental_db_4efh',
  process.env.DB_USER || 'motorcycle_rental_db_user',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'dpg-d9t2d7gu5vbs73bqclng-a',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');
    console.log('✅ Database ready');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };