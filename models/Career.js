const { sequelize, DataTypes } = require('../db');

const Career = sequelize.define('career', {
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
  institute: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  college_id: {
    type: DataTypes.STRING,
    allowNull:true,
  },
  mail_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  achievements: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  github: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      is: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i,     
    },
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-_]+\/?$/i,
    },
  },
  skills: {
    type: DataTypes.STRING,
  },
  resume:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  posting_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  tableName: 'careers',
});

module.exports = Career;
