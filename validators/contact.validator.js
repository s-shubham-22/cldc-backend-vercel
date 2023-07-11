const { body } = require('express-validator');

exports.validateCreateContact = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('message')
    .exists()
    .withMessage('Message is required'),
];
