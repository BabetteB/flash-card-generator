import { RequestHandler } from 'express';
import { createFlashcards } from '../services/flashcardService';

export const generateFlashcards: RequestHandler = async (req, res, next) => {
  try {
    const content = req.body.content || ''; 
    const pdfFile = req.file;
    if (!pdfFile) {
      throw new Error('No file uploaded');
    }

    const flashcards = await createFlashcards(content, pdfFile);

    // Send the response, but don't "return" it
    res.status(200).json({ flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ message: 'Error generating flashcards.' });
  }
};
