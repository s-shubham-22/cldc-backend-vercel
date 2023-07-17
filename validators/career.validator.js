const { body } = require('express-validator');

const { Career } = require('../models');

exports.validateCreateCareer = [
  body('student_id')
    .exists()
    .withMessage('Student ID is required')
    .isLength({ min: 5 })
    .withMessage('Student ID must be at least 5 characters long')
    .custom(async (value) => {
      const career = await Career.findOne({ where: { student_id: value } });
      if (career) {
        throw new Error('Career already exists');
      }
      return true;
    }),
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('institute')
    .exists()
    .withMessage('Institute is required'),
  body('department')
    .exists()
    .withMessage('Department is required'),
  body('semester')
    .exists()
    .withMessage('Semester is required')
    .custom(async (value) => {
      if (value > 8 || value < 1) {
        throw new Error('Semester must be between 1 and 8');
      }
      return true;
    }),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  body('contact')
    .exists()
    .withMessage('Contact is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Contact must be 10 digits long'),
  body('position')
    .exists()
    .withMessage('Position is required'),
  body('github')
    .exists()
    .withMessage('Github is required')
    .isURL()
    .withMessage('Github is invalid')
    .matches(/^(https:\/\/github.com\/)([a-zA-Z0-9_-]+)(\/)?$/)
    .withMessage('Github is invalid'),
  body('linkedin')
    .exists()
    .withMessage('Linkedin is required')
    .isURL()
    .withMessage('Linkedin is invalid')
    .matches(/^(https:\/\/www.linkedin.com\/in\/)([a-zA-Z0-9_-]+)(\/)?$/)
    .withMessage('Linkedin is invalid'),
  body('resume')
    .exists()
    .withMessage('Resume is required')
    .isURL()
    .withMessage('Resume is invalid'),
];

exports.validateUpdateCareer = [
  body('student_id')
    .exists()
    .withMessage('Student ID is required')
    .isLength({ min: 5 })
    .withMessage('Student ID must be at least 5 characters long')
    .custom(async (value) => {
      const career = await Career.findOne({ where: { student_id: value } });
      if (career) {
        throw new Error('Career already exists');
      }
      return true;
    }),
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('institute')
    .exists()
    .withMessage('Institute is required'),
  body('department')
    .exists()
    .withMessage('Department is required'),
  body('semester')
    .exists()
    .withMessage('Semester is required')
    .custom(async (value) => {
      if (value > 8 || value < 1) {
        throw new Error('Semester must be between 1 and 8');
      }
      return true;
    }),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  body('contact')
    .exists()
    .withMessage('Contact is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Contact must be 10 digits long'),
  body('position')
    .exists()
    .withMessage('Position is required'),
  body('github')
    .exists()
    .withMessage('Github is required')
    .isURL()
    .withMessage('Github is invalid')
    .matches(/^(https:\/\/github.com\/)([a-zA-Z0-9_-]+)(\/)?$/)
    .withMessage('Github is invalid'),
  body('linkedin')
    .exists()
    .withMessage('Linkedin is required')
    .isURL()
    .withMessage('Linkedin is invalid')
    .matches(/^(https:\/\/www.linkedin.com\/in\/)([a-zA-Z0-9_-]+)(\/)?$/)
    .withMessage('Linkedin is invalid'),
  body('resume')
    .isURL()
    .withMessage('Resume is invalid'),
];