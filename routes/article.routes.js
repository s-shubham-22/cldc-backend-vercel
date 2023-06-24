const express = require('express');
const {
  articleController: {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  },
} = require('../controllers');

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
