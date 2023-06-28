const { sequelize, DataTypes } = require('../db');
const { MODE } = require('../utils/constant');

const Event = sequelize.define('event', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  event_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  event_venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_mode: {
    type: DataTypes.ENUM(MODE.ONLINE, MODE.OFFLINE),
    allowNull: false,
    defaultValue: MODE.ONLINE,
  },
  registration_deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  registration_fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  banner: {
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
