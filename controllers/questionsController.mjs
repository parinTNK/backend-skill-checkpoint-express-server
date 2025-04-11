import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.questions.findMany();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Unable to fetch questions." });
  }
};

const getQuestionById = async (req, res) => {
  const { questionsId } = req.params;
  try {
    const question = await prisma.questions.findUnique({
      where: { id: Number(questionsId) },
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Unable to fetch questions." });
  }
};

const createQuestion = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newQuestion = await prisma.questions.create({
      data: {
        title,
        description,
        category,
      },
    });
    if (!newQuestion) {
      return res.status(400).json({ message: "Unable to create question." });
    }
    res.status(201).json({ message: "Question created successfully." });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Unable to create question." });
  }
};

const updateQuestion = async (req, res) => {
  const { questionsId } = req.params;
  const { title, description, category } = req.body;
  try {
    const updatedQuestion = await prisma.questions.update({
      where: { id: Number(questionsId) },
      data: {
        title,
        description,
        category,
      },
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    } else if (!updatedQuestion) {
      return res.status(400).json({ message: "Invalid request data." });
    }
    res.status(200).json({ message: "Question updated successfully." });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Unable to update question." });
  }
};

const deleteQuestion = async (req, res) => {
  const { questionsId } = req.params;
  try {
    const deleteQuestion = await prisma.questions.delete({
      where: { id: Number(questionsId) },
    });
    if (!deleteQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error("Error deleting question:", error);
    res
      .status(500)
      .json({ message: "Question post has been deleted successfully." });
  }
};

const searchQuestions = async (req, res) => {
  const { category } = req.query;

  if (!category || category.trim() === "") {
    return res
      .status(400)
      .json({ message: "Category query parameter is required." });
  }

  try {
    const questions = await prisma.questions.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: category, mode: "insensitive" } },
              { category: { contains: category, mode: "insensitive" } },
            ],
          },
          {
            category: { not: null },
          },
        ],
      },
    });

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found." });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error searching questions:", error);
    res.status(500).json({ message: "Unable to search questions." });
  }
};

const createAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Answer content is required." });
  }

  try {
    const question = await prisma.questions.findUnique({
      where: { id: Number(questionId) },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const answer = await prisma.answers.create({
      data: {
        content,
        question_id: Number(questionId),
      },
    });

    res.status(201).json({
      message: "Answer created successfully.",
      answer,
    });
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ message: "Unable to create answer." });
  }
};

const getAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await prisma.questions.findUnique({
      where: { id: Number(questionId) },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const answers = await prisma.answers.findMany({
      where: { question_id: Number(questionId) },
    });

    res.status(200).json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Unable to fetch answers." });
  }
};

const deleteAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await prisma.questions.findUnique({
      where: { id: Number(questionId) },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const deleteResult = await prisma.answers.deleteMany({
      where: { question_id: Number(questionId) },
    });

    res.status(200).json({
      message: "All answers for the question have been deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting answers:", error);
    res.status(500).json({ message: "Unable to delete answers." });
  }
};

const voteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res
      .status(400)
      .json({ message: "Vote value must be either 1 or -1." });
  }

  try {
    const question = await prisma.questions.findUnique({
      where: { id: Number(questionId) },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    await prisma.question_votes.create({
      data: {
        question_id: Number(questionId),
        vote: vote,
      },
    });

    res.status(200).json({
      message: "Vote on the question has been recorded successfully.",
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    res.status(500).json({ message: "Unable to process vote." });
  }
};

const voteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res
      .status(400)
      .json({ message: "Vote value must be either 1 or -1." });
  }

  try {
    const answer = await prisma.answers.findUnique({
      where: { id: Number(answerId) },
    });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found." });
    }

    await prisma.answer_votes.create({
      data: {
        answer_id: Number(answerId),
        vote: vote,
      },
    });

    res.status(200).json({
      message: "Vote on the answer has been recorded successfully.",
    });
  } catch (error) {
    console.error("Error processing vote:", error);
    res.status(500).json({ message: "Unable to process vote." });
  }
};

export {
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
};
