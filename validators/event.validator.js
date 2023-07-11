const { body } = require('express-validator');

const { Event } = require('../models');
const { MODE } = require('../utils/constant')

exports.validateCreateEvent = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long')
    .custom(async (value) => {
      const event = await Event.findOne({ where: { name: value } });
      if (event) {
        throw new Error('Event already exists');
      }
      return true;
    }),
  body('description')
    .exists()
    .withMessage('Description is required'),
  body('event_date')
    .exists()
    .withMessage('Event date is required'),
  body('event_time')
    .exists()
    .withMessage('Event time is required'),
  body('event_venue')
    .exists()
    .withMessage('Event venue is required'),
  body('event_mode')
    .exists()
    .withMessage('Event mode is required')
    .isIn([MODE.ONLINE, MODE.OFFLINE])
    .withMessage('Event mode must be either online or offline'),
  body('registration_deadline')
    .exists()
    .withMessage('Registration deadline is required')
    .custom((value, { req }) => {
      if (value < req.body.event_date) {
        throw new Error('Registration deadline must be after event date');
      }
      return true;
    }),
  body('registration_fee')
    .exists()
    .withMessage('Registration fee is required'),
  body('banner')
    .exists()
    .withMessage('Banner is required'),
];

exports.validateUpdateEvent = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('description')
    .exists()
    .withMessage('Description is required'),
  body('event_date')
    .exists()
    .withMessage('Event date is required'),
  body('event_time')
    .exists()
    .withMessage('Event time is required'),
  body('event_venue')
    .exists()
    .withMessage('Event venue is required'),
  body('event_mode')
    .exists()
    .withMessage('Event mode is required')
    .isIn([MODE.ONLINE, MODE.OFFLINE])
    .withMessage('Event mode must be either online or offline'),
  body('registration_deadline')
    .exists()
    .withMessage('Registration deadline is required')
    .custom((value, { req }) => {
      if (value < req.body.event_date) {
        throw new Error('Registration deadline must be after event date');
      }
      return true;
    }),
  body('registration_fee')
    .exists()
    .withMessage('Registration fee is required'),
];