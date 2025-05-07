import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askAI } from './ai/chat';
import db from './db';

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

    // 💾 Spara fråga och svar i databasen
    db.prepare(`
      INSERT INTO questions (question, answer) VALUES (?, ?)
    `).run(question, answer);

    res.json({ answer });
  } catch (error) {
    console.error('❌ Fel i API:', error);
    res.status(500).json({ error: 'Något gick fel när AI försökte svara.' });
  }
});

app.get('/api/history', (req: Request, res: Response): void => {
  try {
    const rows = db.prepare(`
      SELECT id, question, answer, created_at
      FROM questions
      ORDER BY created_at DESC
      LIMIT 10
    `).all();

    res.json(rows);
  } catch (error) {
    console.error('❌ Fel vid hämtning av historik:', error);
    res.status(500).json({ error: 'Kunde inte hämta historiken.' });
  }
});

app.delete('/api/history/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    db.prepare(`DELETE FROM questions WHERE id = ?`).run(id);
    res.sendStatus(200);
  } catch {
    res.status(500).json({ error: 'Kunde inte ta bort frågan.' });
  }
});

app.delete('/api/history', (req: Request, res: Response) => {
  try {
    db.prepare(`DELETE FROM questions`).run();
    res.sendStatus(200);
  } catch {
    res.status(500).json({ error: 'Kunde inte rensa frågehistoriken.' });
  }
});



app.listen(3001, () => {
  console.log('✅ Backend körs på http://localhost:3001');
});
