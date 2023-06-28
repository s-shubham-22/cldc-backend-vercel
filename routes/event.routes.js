const express = require('express');
const {
  eventController: {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  },
} = require('../controllers');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
