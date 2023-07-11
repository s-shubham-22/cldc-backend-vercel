const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { TeamMember } = require('../models');

exports.validateCreateTeamMember = [
  body('member_id')
    .exists()
    .withMessage('Member ID is required')
    .custom(asyncHandler(async (value) => {
      const teamMember = await TeamMember.findOne({ where: { member_id: value } });
      if (teamMember) {
        throw new Error('Team member already exists');
      }
      return true;
    })),
  body('name')
    .exists()
    .withMessage('Name is required'),
  body('designation')
    .exists()
    .withMessage('Designation is required'),
  body('linkedin')
    .exists()
    .withMessage('LinkedIn is required')
    .isURL()
    .withMessage('LinkedIn must be a valid URL'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('image')
    .exists()
    .withMessage('Image is required'),
];

exports.validateUpdateTeamMember = [
  body('member_id')
    .exists()
    .withMessage('Member ID is required')
    .custom(asyncHandler(async (value) => {
      const teamMember = await TeamMember.findOne({ where: { member_id: value } });
      if (teamMember) {
        throw new Error('Team member already exists');
      }
      return true;
    })),
  body('name')
    .exists()
    .withMessage('Name is required'),
  body('designation')
    .exists()
    .withMessage('Designation is required'),
  body('linkedin')
    .exists()
    .withMessage('LinkedIn is required')
    .isURL()
    .withMessage('LinkedIn must be a valid URL'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),
];
