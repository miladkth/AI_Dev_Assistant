import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askAI } from './ai/chat';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/query', async (req: Request, res: Response): Promise<void> => {

  const { question } = req.body;

  if (!question) {
     res.status(400).json({ error: 'Ingen fråga angavs.' });
     return;
  }

  try {
    const answer = await askAI(question);
    res.json({ answer });
  } catch (error) {
    console.error('❌ Fel i API:', error);
    res.status(500).json({ error: 'Något gick fel när AI försökte svara.' });
  }
});

app.listen(3001, () => {
  console.log('✅ Backend körs på http://localhost:3001');
});
