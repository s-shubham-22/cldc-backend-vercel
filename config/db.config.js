module.exports = {
    // Database - PostgreSQL

    HOST: 'localhost',
    NAME: 'cldc',
    USER: 'admin',
    PASSWORD: 'admin',
    DIALECT: 'postgres',

    // Pool-Settings

    POOl: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000,
    },
};
