const router = require('express').Router();
const {
  teamMemberController: {
    getTeamMembers,
    getTeamMember,
    // createTeamMember,
    // updateTeamMember,
    // deleteTeamMember,
    // deleteTeamMembers,
  },
} = require('../controllers');
// const {
//   teamMemberValidator: {
//     validateCreateTeamMember,
//     validateUpdateTeamMember,
//   },
//   validate,
// } = require('../validators');

router.get('/', getTeamMembers);
router.get('/:member_id', getTeamMember);
// router.post('/', validateCreateTeamMember, validate, createTeamMember);
// router.put('/:id', validateUpdateTeamMember, validate, updateTeamMember);
// router.delete('/', deleteTeamMembers);
// router.delete('/:id', deleteTeamMember);

module.exports = router;
