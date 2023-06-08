require('dotenv').config({ path: './.env' });
const { Sequelize, DataTypes } = require('sequelize');
const {
  // POSTGRES_URI,
  HOST, DIALECT, POOl,
} = require('./config/db.config');

const sequelize = new Sequelize(
  // POSTGRES_URI,
  // eslint-disable-next-line max-len
  'postgres://default:eSo1QXrVN0nc@ep-summer-firefly-398025.us-east-1.postgres.vercel-storage.com:5432/verceldb',
  {
    host: HOST,
    dialect: DIALECT,
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
