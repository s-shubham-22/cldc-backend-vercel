const express = require('express');
const {
    contactController: {
        getContacts,
        getContact,
        createContact,
        // updateContact,
        // deleteContact,
        // deleteContacts,
    },
} = require('../controllers');

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', createContact);
// router.put('/:id', updateContact);
// router.delete('/', deleteContacts);
// router.delete('/:id', deleteContact);

module.exports = router;
