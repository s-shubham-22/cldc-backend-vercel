require('dotenv').config({ path: './.env' });
const { Sequelize, DataTypes } = require('sequelize');
const {
    NAME, USER, PASSWORD, HOST, DIALECT, POOl,
} = require('./config/db.config');

const sequelize = new Sequelize(
    NAME,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: DIALECT,
        logging: false,

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
