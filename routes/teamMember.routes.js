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

router.get('/', getTeamMembers);
router.get('/:member_id', getTeamMember);
// router.post('/', createTeamMember);
// router.put('/:id', updateTeamMember);
// router.delete('/', deleteTeamMembers);
// router.delete('/:id', deleteTeamMember);

module.exports = router;
