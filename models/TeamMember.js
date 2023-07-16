const { sequelize, DataTypes } = require('../db');

const TeamMember = sequelize.define('team_member', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      // eslint-disable-next-line max-len
      is: /^https?:\/\/([a-z]{2,3}\.)?github\.com\[a-zA-Z0-9-_]+\/?$/i,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'team_members',
});

module.exports = TeamMember;
