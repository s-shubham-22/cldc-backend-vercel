const { body } = require('express-validator');

const { Article } = require('../models');

exports.validateCreateArticle = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long')
    .custom(async (value) => {
      const article = await Article.findOne({ where: { name: value } });
      if (article) {
        throw new Error('Article already exists');
      }
      return true;
    }),
  body('category')
    .exists()
    .withMessage('Category is required'),
  body('content')
    .exists()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),
  body('banner')
    .exists()
    .withMessage('Banner is required'),
];

exports.validateUpdateArticle = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  body('category')
    .exists()
    .withMessage('Category is required'),
  body('content')
    .exists()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),
];
