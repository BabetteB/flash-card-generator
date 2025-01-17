import { Router } from 'express';
import { generateFlashcards } from '../controllers/flashcardController';

const router = Router();

// POST /api/flashcards/generate
router.post('/generate', generateFlashcards);

export default router;
