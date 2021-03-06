const QuizSubmission = require('../models/quizSubmissionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllQuizSubmissions = catchAsync(async (req, res, next) => {
    let filterObj = {};
    if (req.query.user) {
        filterObj.user = req.query.user;
    }
    if (req.query.quiz) {
        filterObj.quiz = {
            _id: req.query.quiz
        };
    }
    const quizSubmissions = await QuizSubmission.find(filterObj).populate({
        path: 'quiz user',
        select: 'title name'
    });

    res.status(200).json({
        status: 'success',
        results: quizSubmissions.length,
        data: {
            quizSubmissions
        }
    });
});

exports.getQuizSubmission = catchAsync(async (req, res, next) => {
    const quizSubmission = await QuizSubmission.findById(req.params.id).populate({
        path: 'quiz',
        select: '-category -duration -active -createdAt -topic -questionWeightage -__v',
        populate: {
            path: 'questions'
        }
    });

    if (!quizSubmission) {
        return next(new AppError('No quiz submission found with that ID.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: quizSubmission
        }
    });
});

exports.updateQuizSubmission = catchAsync(async (req, res, next) => {
    const quizSubmission = await QuizSubmission.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!quizSubmission) {
        return next(new AppError('No quiz submission found with that ID.', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: quizSubmission
        }
    });
});

exports.deleteQuizSubmission = catchAsync(async (req, res, next) => {
    const quizSubmission = await QuizSubmission.findByIdAndDelete(req.params.id);

    if (!quizSubmission) {
        return next(new AppError('No quiz submission found with that ID.', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});