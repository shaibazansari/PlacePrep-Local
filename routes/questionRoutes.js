const express = require('express');
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(questionController.getAllQuestions)
    .post(questionController.createQuestion);

router
    .get('/:slug', questionController.getQuestion);

router
    .route('/:id')
    .patch(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

module.exports = router;