import { Request, Response } from 'express';
import { createFlashcardsFromText } from '../services/flashcardService';

export const generateFlashcards = async (req: Request, res: Response) => {
  try {
    const { content } = req.body; // e.g. user-submitted text from which to generate flashcards
    const flashcards = await createFlashcardsFromText(content);
    return res.status(200).json({ flashcards });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error generating flashcards.' });
  }
};
