require('dotenv').config({ path: '../.env' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const path = require('path');
const asyncHandler = require('express-async-handler');
const members = require('./data/teamMembers.data');
const { TeamMember } = require('../models');
const cloudinaryConfig = require('../config/cloudinary.config');

const directoryPath = path.join(__dirname, './images');

cloudinary.config(cloudinaryConfig);

const seedTeamMembers = asyncHandler(async () => {
  try {
    console.log('🌱 Seeding team members...');
    const folder = process.env.CLOUDINARY_FOLDER;
    const subfolder = 'team-members';
    const folderName = `${folder}/${subfolder}`;
    await cloudinary.api.delete_resources_by_prefix(folderName, (error, result) => {
      if (error) {
        console.error('Error deleting files:', error);
        return;
      }
      console.log('✅ Pre-Stored Image Files deleted successfully: ', result);
    });
    await TeamMember.destroy({ where: {} });

    const uploadPromises = members.map(async (member) => {
      const { member_id, name } = member;
      const formattedName = name.replace(/\s+/g, '_');
      const imageName = `${member_id}_${formattedName}`;

      try {
        const files = await fs.readdir(directoryPath);
        const image = files.find((file) => file.startsWith(member_id));
        if (image) {
          const imagePath = path.join(directoryPath, image);
          const result = await cloudinary.uploader.upload(imagePath, {
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
          });
          const updatedMember = { ...member, image: result.secure_url };
          await TeamMember.create(updatedMember)
            .catch((error) => {
              console.error('❌ Unable to seed team member:', updatedMember, error);
            });
          console.log(`✅ ${updatedMember.name} seeded successfully!`);
        } else {
          console.log(`Image for ${imageName} not found!`);
        }
      } catch (error) {
        console.error('❌ Unable to process member:', member, error);
      }
    });

    await Promise.all(uploadPromises);

    console.log('🌱 Team members seeded successfully!');
  } catch (error) {
    console.error('❌ Unable to seed team members: ', error);
  }
});

module.exports = seedTeamMembers;
