import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { analyzeRouter } from './routes/analyzeRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'placement-ai-backend' });
});

app.use('/api/analyze', analyzeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Placement AI backend listening on http://localhost:${PORT}`);
});
