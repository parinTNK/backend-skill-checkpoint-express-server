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

const router = express.Router();


router.get('/questions', getAllQuestions);
router.get('/questions/search', searchQuestions);
router.get('/questions/:questionsId', getQuestionById);
router.post('/questions', createQuestion);
router.put('/questions/:questionsId', updateQuestion);
router.delete('/questions/:questionsId', deleteQuestion);
router.post('/questions/:questionId/answers', createAnswer);
router.get('/questions/:questionId/answers', getAnswersByQuestionId);
router.delete('/questions/:questionId/answers', deleteAnswersByQuestionId);
router.post('/questions/:questionId/vote', voteQuestion);
router.post('/answers/:answerId/vote', voteAnswer);

export default router;