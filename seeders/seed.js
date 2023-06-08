const seedTeamMembers = require('./teamMembers.seed');

const seed = async () => {
  await seedTeamMembers();
};

module.exports = seed;
