const { sequelize, DataTypes } = require('../db');

const Event = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    event_time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    event_venue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    registration_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'events',
});

module.exports = Event;
