const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');
const { cloudinaryConfig } = require('../config/cloudinary.config');
const { Article } = require('../models');

cloudinary.config(cloudinaryConfig);

const folder = process.env.CLOUDINARY_FOLDER;
const subfolder = 'articles';
const path = `${folder}/${subfolder}`;

exports.createArticle = asyncHandler(async (req, res) => {
  try {
    const banner = req.files.banner[0].path;
    const newArticle = await Article.create({
      ...req.body,
      banner,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(201).json(articles);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    res.status(201).json(article);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.updateArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    if (req.files.banner === undefined) {
      const updatedArticle = await article.update(req.body);
      res.status(201).json(updatedArticle);
      return;
    }

    const banner = req.files.banner[0].path;

    if (article.banner !== banner) {
      const publicId = article.banner.split('/').pop().split('.')[0];

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

    const updatedArticle = await article.update({
      ...req.body,
      banner,
    });

    res.status(201).json(updatedArticle);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.deleteArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      res.status(404);
      throw new Error('Article not found');
    }

    const publicId = article.banner.split('/').pop().split('.')[0];

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

    await article.destroy();

    res.status(201).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
