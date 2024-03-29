const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  articleValidator: require('./article.validator'),
  contactValidator: require('./contact.validator'),
  eventValidator: require('./event.validator'),
  teamMemberValidator: require('./teamMember.validator'),
  careerValidator: require('./career.validator'),
  validate,
};
