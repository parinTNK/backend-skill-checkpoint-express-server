import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const validateId = (idName) => {
  return (req, res, next) => {
    const id = Number(req.params[idName]);
    if (isNaN(id)) {
      return res.status(400).json({ message: `Invalid ${idName} provided.` });
    }
    req.validatedId = id; 
    next();
  };
};


export const checkQuestionExists = async (req, res, next) => {
  try {
    const id = req.validatedId || Number(req.params.questionsId) || Number(req.params.questionId);
    const question = await prisma.questions.findUnique({
      where: { id }
    });
    
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    
    req.question = question; 
    next();
  } catch (error) {
    console.error("Error checking question:", error);
    res.status(500).json({ message: "Server error while processing request." });
  }
};


export const checkAnswerExists = async (req, res, next) => {
  try {
    const id = Number(req.params.answerId);
    const answer = await prisma.answers.findUnique({
      where: { id }
    });
    
    if (!answer) {
      return res.status(404).json({ message: "Answer not found." });
    }
    
    req.answer = answer;
    next();
  } catch (error) {
    console.error("Error checking answer:", error);
    res.status(500).json({ message: "Server error while processing request." });
  }
};


export const validateVote = (req, res, next) => {
  const { vote } = req.body;
  
  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({ message: "Vote value must be either 1 or -1." });
  }
  
  next();
};