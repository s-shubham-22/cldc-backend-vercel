require('dotenv').config();

module.exports = {
  // Database - PostgreSQL

  // HOST: 'localhost',
  // NAME: 'cldc',
  // USER: 'admin',
  // PASSWORD: 'admin',
  // DIALECT: 'postgres',

  // Postgres using uri
  POSTGRES_URL: process.env.POSTGRES_URL,

  // Pool-Settings

  POOl: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
