require('dotenv').config({ path: './.env' });
const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');
const asyncHandler = require('express-async-handler');
const {
  DATABASE_URL, HOST, DIALECT, POOl,
} = require('./config/db.config');
const sequelize = new Sequelize(
  'postgres://shekhatniral18:K4b1LcZQeAsR@ep-raspy-bonus-621913-pooler.us-east-2.aws.neon.tech/neondb',
  {
    host: PGHOST,
    dialect: DIALECT,
    dialectModule:pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      MAX: 5,
      MIN: 0,
      ACQUIRE: 30000,
      IDLE: 10000,
  },
  },
);

const connectDB = asyncHandler(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database: ', error);
  }
});

module.exports = { connectDB, sequelize, DataTypes };
