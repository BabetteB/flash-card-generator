import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flashcardRoutes from './routes/flashcardRoute';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flashcards', flashcardRoutes);

export default app;
