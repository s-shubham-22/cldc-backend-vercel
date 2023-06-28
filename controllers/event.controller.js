const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');
const { cloudinaryConfig } = require('../config/cloudinary.config');
const { Event } = require('../models');

cloudinary.config(cloudinaryConfig);

const folder = process.env.CLOUDINARY_FOLDER;
const subfolder = 'events';
const path = `${folder}/${subfolder}`;

exports.createEvent = asyncHandler(async (req, res) => {
  try {
    const banner = req.files.banner[0].path;
    const newEvent = await Event.create({
      ...req.body,
      banner,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(201).json(events);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

exports.getEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    res.status(201).json(event);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

exports.updateEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (req.files.banner === undefined) {
      const updatedEvent = await event.update(req.body);
      res.status(201).json(updatedEvent);
      return;
    }

    const banner = req.files.banner[0].path;

    if (event.banner !== banner) {
      const publicId = event.banner.split('/').pop().split('.')[0];

      await cloudinary.uploader.destroy(
        `${path}/${publicId}`,
        (error, result) => {
          if (error) {
            console.error('Error deleting files:', error);
            return;
          }

          console.log('✅ Image deleted successfully:', result);
        },
      );
    }

    const updatedEvent = await event.update({
      ...req.body,
      banner,
    });

    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    const publicId = event.banner.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy(
      `${path}/${publicId}`,
      (error, result) => {
        if (error) {
          console.error('Error deleting files:', error);
          return;
        }

        console.log('✅ Image deleted successfully:', result);
      },
    );

    await event.destroy();

    res.status(201).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
