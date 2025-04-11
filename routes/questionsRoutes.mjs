import express from 'express';
import {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestions,
    createAnswer,
    getAnswersByQuestionId,
    deleteAnswersByQuestionId,
    voteQuestion,
    voteAnswer,
} from '../controllers/questionsController.mjs';
import { 
    validateId, 
    checkQuestionExists, 
    checkAnswerExists, 
    validateVote,
    validateAnswerContent
} from '../middleware/validation.mjs';

const router = express.Router();


router.route('/questions')
    .get(getAllQuestions)
    .post(createQuestion);

router.get('/questions/search', searchQuestions);

router.route('/questions/:questionsId')
    .get(validateId('questionsId'), checkQuestionExists, getQuestionById)
    .put(validateId('questionsId'), checkQuestionExists, updateQuestion)
    .delete(validateId('questionsId'), checkQuestionExists, deleteQuestion);


router.route('/questions/:questionId/answers')
    .get(validateId('questionId'), checkQuestionExists, getAnswersByQuestionId)
    .post(validateId('questionId'), checkQuestionExists, validateAnswerContent, createAnswer)
    .delete(validateId('questionId'), checkQuestionExists, deleteAnswersByQuestionId);


router.post('/questions/:questionId/vote', validateId('questionId'), checkQuestionExists, validateVote, voteQuestion);
router.post('/answers/:answerId/vote', validateId('answerId'), checkAnswerExists, validateVote, voteAnswer);

export default router;