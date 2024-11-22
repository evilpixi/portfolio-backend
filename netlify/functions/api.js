import express, { Router } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
dotenv.config();


import OpenAI from 'openai-api';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const api = express();
const router = Router();

router.get('/pixi', (req, res) =>
{
  res.json({ message: 'Pixi Loves U x2!' });
});


router.post('/ask', async (req, res) =>
{
  try
  {
    console.log("REQ -----------------------------------------------");
    console.log(req);
    console.log("PROMPT --------------------------------------------");
    const { prompt } = req.body;
    console.log(prompt);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });
    console.log("MESSAGE -------------------------------------------");
    const message = completion.choices[0].message;
    console.log(message);
    res.json({ message: message.content });
  } catch (error)
  {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      message: 'Internal Server Error',
      req: req.body
    });
  }
});

api.use(express.json());
api.use('/api/', router);
export const handler = serverless(api);