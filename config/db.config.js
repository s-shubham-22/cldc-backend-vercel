require('dotenv').config();

module.exports = {
  // POSTGRES_URL: process.env.POSTGRES_URL,

  // PGHOST: process.env.PGHOST,
  // PGUSER: process.env.PGUSER,
  // PGDATABASE: process.env.PGDATABASE,
  // PGPASSWORD: process.env.PGPASSWORD,
  // DATABASE_URL: process.env.DATABASE_URL,

  DATABASE_URL: process.env.DATABASE_URL,

  // Pool-Settings

  POOl: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
