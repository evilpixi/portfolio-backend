require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event, context) =>
{
  // ----------------------- Routes -----------------------

  // --------- GET / ---------
  if (event.httpMethod === 'GET')
  {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pixi loves you!' })
    };
  }

  // --------- POST /ask ---------
  if (event.httpMethod === 'POST')
  {
    try
    {
      // Process the POST request as needed
      const { prompt } = JSON.parse(event.body);

      return {
        statusCode: 200,
        body: JSON.stringify(prompt)
      };

      // --- this for the next deployment
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      const message = completion.choices[0].message;

      // Return the data as the response
      return {
        statusCode: 200,
        body: JSON.stringify({ message: message.content }),
      };
    } catch (error)
    {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process POST request', errorDetails: error, event: event }),
      };
    }
  }

};