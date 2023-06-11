require('dotenv').config({ path: './.env' });
const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');
const {
  DATABASE_URL, HOST, DIALECT, POOl,
} = require('./config/db.config');

const sequelize = new Sequelize(
  DATABASE_URL,
  {
    host: HOST,
    dialect: DIALECT,
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: POOl,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database: ', error);
  }
};

module.exports = { connectDB, sequelize, DataTypes };
