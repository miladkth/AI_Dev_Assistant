// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Läser in .env-filen om den finns (t.ex. API-nycklar)
dotenv.config();

const app = express();
app.use(cors()); // Tillåter cross-origin requests
app.use(express.json()); // Gör så att vi kan läsa JSON i req.body

// En enkel POST-endpoint för frågor
app.post('/api/query', async (req: Request, res: Response): Promise<void> => {

  const { question } = req.body;

  if (!question) {
     res.status(400).json({ error: 'Ingen fråga angavs.' });
     return
  }

  // Temporär hårdkodad respons – vi kopplar in AI senare
  const answer = `Du frågade: ${question}`;
  res.json({ answer });
});

// Startar servern på port 3001
app.listen(3001, () => {
  console.log('✅ Backend körs på http://localhost:3001');
});


