import express, { Request, Response } from 'express';
import cors from 'cors';
import authRouter from './auth';
import todoRouter from './todo';
import { setupSwaggerDocs } from './swagger';

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/', todoRouter);
setupSwaggerDocs(app);

export default app;
