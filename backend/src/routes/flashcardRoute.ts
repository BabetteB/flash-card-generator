import { Router } from 'express';
import multer from 'multer';
import { generateFlashcards } from '../controllers/flashcardController';

const upload = multer(); // or configure disk/storage options

const router = Router();

// Accept text (in JSON) as well as a file (multipart/form-data)
router.post('/generate', upload.single('pdfFile'), generateFlashcards);

export default router;
