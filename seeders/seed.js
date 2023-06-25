const asyncHandler = require('express-async-handler');
const seedTeamMembers = require('./teamMembers.seed');

const seed = asyncHandler(async () => {
  try {
    await seedTeamMembers();
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = seed;
