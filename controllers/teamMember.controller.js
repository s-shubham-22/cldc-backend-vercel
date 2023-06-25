const asyncHandler = require('express-async-handler');
const { TeamMember } = require('../models');

exports.getTeamMembers = asyncHandler(async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll();
    res.status(201).json(teamMembers);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

exports.getTeamMember = asyncHandler(async (req, res) => {
  try {
    const teamMember = await TeamMember.findOne({
      where: {
        member_id: req.params.member_id,
      },
    });

    if (!teamMember) {
      res.status(404);
      throw new Error('Team Member not found');
    }

    res.status(201).json(teamMember);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

// exports.createTeamMember = asyncHandler(async (req, res) => {
//   try {
//     const existingMember = await TeamMember.findOne({
//       where: {
//         $or: [
//           { member_id: req.body.member_id },
//           { email: req.body.email },
//           { linkedin: req.body.linkedin },
//         ],
//       },
//     });
//     if (existingMember) {
//       return res.status(400).json({ error: 'Member already exists' });
//     }
//     const name = req.body.name.toLowerCase().replace(/\s/g, '_');
//     eslint - disable - next - line max - len
//     const designation = req.body.designation.toLowerCase().replace(/\s/g, '_');
//     req.body.image = `${name}_${designation}.jpg`;
//     const teamMember = await TeamMember.create(req.body);
//     return res.status(201).json(teamMember);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// });

// exports.updateTeamMember = asyncHandler(async (req, res) => {
//   try {
//     const teamMember = await TeamMember.findByPk(req.params.id);
//     await teamMember.update(req.body);
//     const name = teamMember.name.toLowerCase().replace(/\s/g, '_');
//     eslint - disable - next - line max - len
//     const designation = teamMember.designation.toLowerCase().replace(/\s/g, '_');
//     teamMember.image = `${name}_${designation}.jpg`;
//     await teamMember.save();
//     res.status(201).json(teamMember);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// exports.deleteTeamMember = asyncHandler(async (req, res) => {
//   try {
//     const teamMember = await TeamMember.findByPk(req.params.id);
//     await teamMember.destroy();
//     res.status(201).json(teamMember);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// exports.deleteTeamMembers = asyncHandler(async (req, res) => {
//   try {
//     const teamMembers = await TeamMember.destroy({ where: {} });
//     res.status(201).json(teamMembers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
