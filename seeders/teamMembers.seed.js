require('dotenv').config({ path: '../.env' });
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const members = require('./data/teamMembers.data');
const { TeamMember } = require('../models');
const cloudinaryConfig = require('../config/cloudinary.config');

const directoryPath = path.join(__dirname, './images');
let updatedMember = {};

cloudinary.config(cloudinaryConfig);

const seedTeamMembers = async () => {
  try {
    console.log('🌱 Seeding team members...');
    const folderName = 'team-members';
    // eslint-disable-next-line max-len
    await cloudinary.api.delete_resources_by_prefix(folderName, (error, result) => {
      if (error) {
        console.error('Error deleting files:', error);
        return;
      }
      // eslint-disable-next-line max-len
      console.log('✅ Pre-Stored Image Files deleted successfully:', result);
    });
    await TeamMember.destroy({ where: {} });
    await members.forEach(async (member) => {
      const { member_id } = member;
      const name = member.name.replace(/\s+/g, '_');
      const imageName = `${member_id}_${name}`;
      await fs.readdir(directoryPath, async (err, files) => {
        if (err) {
          console.log(`Unable to scan directory: ${err}`);
          return;
        }
        const image = files.find((file) => file.startsWith(member_id));
        if (image) {
          const image_path = path.join(directoryPath, image);
          const result = await cloudinary.uploader.upload(
            image_path,
            {
              public_id: imageName,
              folder: folderName,
              format: 'png',
              transformation: [
                {
                  width: 500,
                  height: 500,
                  crop: 'fill',
                  gravity: 'face',
                  quality: 'auto',
                  fetch_format: 'auto',
                },
              ],
            },
          );
          updatedMember = {
            ...member, image: result.secure_url,
          };
        } else {
          console.log(`Image for ${imageName} not found!`);
        }
        await TeamMember.create(updatedMember);
        console.log(`✅ ${updatedMember.name} seeded successfully!`);
      });
    });
    console.log('🌱 Team members seeded successfully!');
  } catch (error) {
    console.error('❌ Unable to seed team members: ', error);
  }
};

module.exports = seedTeamMembers;
