//import express, { Request, Response } from 'express';
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/query', async (req: express.Request, res: express.Response): Promise<void>=> {
  const { question } = req.body;

  if (!question) {
     res.status(400).json({ error: 'Ingen fråga angavs.' });
     return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Du är en hjälpsam AI-assistent för utvecklare.' },
        { role: 'user', content: question },
      ],
    });

    const answer = chatCompletion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel med OpenAI.' });
  }
});

app.listen(3001, () => {
  console.log('✅ Backend körs på http://localhost:3001');
});
