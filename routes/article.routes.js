const express = require('express');
const {
  articleController: {
    getArticles,
    getArticle,
    // createArticle,
    // updateArticle,
    // deleteArticle,
  },
} = require('../controllers');
// const {
//   articleValidator: {
//     validateCreateArticle,
//     validateUpdateArticle,
//   },
//   validate,
// } = require('../validators');

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticle);
// router.post('/', validateCreateArticle, validate, createArticle);
// router.put('/:id', validateUpdateArticle, validate, updateArticle);
// router.delete('/:id', deleteArticle);

module.exports = router;
