require('dotenv').config();

module.exports = {
  POSTGRES_URL: process.env.POSTGRES_URL,

  // Pool-Settings

  POOl: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
