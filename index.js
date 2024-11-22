const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const morgan = require('morgan');
require('dotenv').config();

console.log("---- PIXI WANTED TO START THE SERVER ----");

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(morgan((tokens, req, res) =>
{
  const url = tokens.url(req, res);
  const remoteAddr = tokens['remote-addr'](req, res);
  const tabsAddr = remoteAddr.length > 8 ? '\t' : '\t\t';
  const tabsUrl = url.length > 8 ? '\t' : '\t\t\t';
  return `> \x1b[30m${tokens.date(req, res, 'clf')}\t from \x1b[0m${tokens['remote-addr'](req, res)}${tabsAddr}\x1b[32m${tokens.method(req, res)}\x1b[0m \t\x1b[33m${tokens.status(req, res)}\x1b[0m ${url}${tabsUrl}${tokens['response-time'](req, res)} ms`;
}));
app.use(express.json());




// ----------------------- Routes -----------------------
// GET /
app.get('/', async (req, res) =>
{
  console.log("-----------------------------------------------");
  const defaultPromp = `This is a call from the Server API, tell me a random character name from Inuyasha`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: defaultPromp }],
    model: "gpt-4o",
  });

  const message = completion.choices[0].message;

  res.send(message.content);
  console.log(message.content);
});



// POST /ask
app.post('/ask', async (req, res) =>
{
  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
  });

  const message = completion.choices[0].message;

  res.send(message.content);
  console.log("-----------------------------------------------");
  console.log(message.content);
});



// ----------------------- Server -----------------------
const port = process.env.PORT || 3000;
const salutation = process.env.SALUTATION || '---';
app.listen(port, () =>
{
  let date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 19).replace('T', '  ');

  console.log('\x1b[32m%s\x1b[0m', salutation);
  console.log(`Server is running on port [\x1b[32m${port}\x1b[0m] at  \x1b[32m${localISOTime}\x1b[0m`);
});