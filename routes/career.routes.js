const express = require('express');
const {
  careerController: {
    getCareers,
    getCareer,
    createCareer,
    // updateCareer,
    deleteCareer,
  },
} = require('../controllers');
const {
  careerValidator: {
    validateCreateCareer,
    // validateUpdateCareer,
  },
  validate,
} = require('../validators');

const router = express.Router();

router.get('/', getCareers);
router.get('/:id', getCareer);
router.post('/', validateCreateCareer, validate, createCareer);
// router.put('/:id', validateUpdateCareer, validate, updateCareer);
router.delete('/:id', deleteCareer);

module.exports = router;
