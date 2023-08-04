const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');
const { cloudinaryConfig } = require('../config/cloudinary.config');
const { Career } = require('../models');
const { Op } = require('sequelize');

cloudinary.config(cloudinaryConfig);

const folder = process.env.CLOUDINARY_FOLDER;
const subfolder = 'careers';
const path = `${folder}/${subfolder}`;

// Keep in memory that resume will be in pdf format, so make controller accordingly
exports.createCareer = asyncHandler(async (req, res) => {
  try {
    const resume = req.files.resume[0].path;
    const career = await Career.findOne({
      where: {
        [Op.or]: [
          { student_id: req.body.student_id },
          { linkedin: req.body.linkedin },
          { github: req.body.github },
          { email: req.body.email },
          { contact: req.body.contact },
        ],
      },
    });

    if (career) {
      await cloudinary.uploader.destroy(
        `${path}/${resume.split('/').pop().split('.')[0]}`,
        (error, result) => {
          if (error) {
            console.log('❌ Error deleting resume:', error);
          }
        },
      );
      res.status(400);
      throw new Error('Career already exists');
    }

    const newCareer = await Career.create({
      ...req.body,
      resume,
    });
    res.status(201).json(newCareer);
  } catch (error) {
    const resume = req.files.resume[0].path;
    await cloudinary.uploader.destroy(
      `${path}/${resume.split('/').pop().split('.')[0]}`,
      (error, result) => {
        if (error) {
          console.log('❌ Error deleting resume:', error);
        }
      },
    );
    res.status(500);
    throw new Error(error);
  }
});

exports.getCareers = asyncHandler(async (req, res) => {
  try {
    const careers = await Career.findAll();
    res.status(201).json(careers);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getCareer = asyncHandler(async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);

    if (!career) {
      res.status(404);
      throw new Error('Career not found');
    }

    res.status(201).json(career);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.updateCareer = asyncHandler(async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);

    if (!career) {
      res.status(404);
      throw new Error('Career not found');
    }

    const resume = req.files.resume[0].path;

    if (resume === undefined) {
      await Career.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );

      res.status(201).json({ message: 'Career updated successfully' });
    } else {
      await cloudinary.uploader.destroy(
        `${path}/${career.resume.split('/').pop().split('.')[0]}`,
        (error, result) => {
          if (error) {
            res.status(500);
            throw new Error(error);
          }

          console.log('✅ Resume deleted successfully:', result);
        },
      );
    }

    const updatedCareer = await Career.update(
      {
        ...req.body,
        resume,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(201).json(updatedCareer);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.deleteCareer = asyncHandler(async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);

    if (!career) {
      res.status(404);
      throw new Error('Career not found');
    }

    const resume = req.files.resume[0].path;

    if (resume) {
      await cloudinary.uploader.destroy(
        `${path}/${career.resume.split('/').pop().split('.')[0]}`,
        (error, result) => {
          if (error) {
            res.status(500);
            throw new Error(error);
          }

          console.log('✅ Resume deleted successfully:', result);
        },
      );
    }

    await career.destroy();

    res.status(201).json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
