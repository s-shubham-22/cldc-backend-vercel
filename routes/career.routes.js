const router = require('express').Router();
const {
    carrerController:{
        getStudent,
        getStudents,
        createStudent
    },
} = require('../controllers')
const {uploads} = require('../uploads')

router.get('/',getStudents)
router.get('/:id',getStudent)
router.post('/',uploads.single("resume"),createStudent)
//router.delete('/:id',deleteStudent)

module.exports = router;