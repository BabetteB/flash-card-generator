import { Request, Response } from 'express';
import { createFlashcards } from '../services/flashcardService';

export const generateFlashcards = async (req: Request, res: Response) => {
  try {
    // If the user also wants to provide some text content in the body (e.g. "description" or "prompt"),
    // you can pass it along with the file. For instance, if you have
    // <input type="text" name="content" /> in the form, or content in JSON if using JSON+file (via a special client).
    const content = req.body.content || ''; 
    
    // `req.file` (not `req.files`) is set by `upload.single('pdfFile')`
    // It contains a buffer, originalname, mimetype, etc.
    const pdfFile = req.file; 
    if (!pdfFile) {
      throw new Error('No file uploaded');
    }

    // Pass the PDF file (and optional text content) to the service
    const flashcards = await createFlashcards(content, pdfFile);

    return res.status(200).json({ flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return res.status(500).json({ message: 'Error generating flashcards.' });
  }
};
