const { Sequelize } = require('sequelize');

// ✅ Debug
console.log('🔍 database.js - DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not defined in .env');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected to Render');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
