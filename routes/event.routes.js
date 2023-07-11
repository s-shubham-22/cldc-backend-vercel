const express = require('express');
const {
  eventController: {
    getEvents,
    getEvent,
    // createEvent,
    // updateEvent,
    // deleteEvent,
  },
} = require('../controllers');
// const {
//   eventValidator: {
//     validateCreateEvent,
//     validateUpdateEvent,
//   },
//   validate,
// } = require('../validators');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
// router.post('/', validateCreateEvent, validate, createEvent);
// router.put('/:id', validateUpdateEvent, validate, updateEvent);
// router.delete('/:id', deleteEvent);

module.exports = router;
