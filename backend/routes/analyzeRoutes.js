import { Router } from 'express';
import { analyzeController } from '../controllers/analyzeController.js';

export const analyzeRouter = Router();

analyzeRouter.post('/', analyzeController);
