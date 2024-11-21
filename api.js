require('dotenv').config();
const OpenAI = require('openai');

console.log("IS THIS WORKING!????")
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
      body: JSON.stringify({ message: 'Pixi loves you 2!' })
    };
  }

  // --------- POST /ask ---------
  if (event.httpMethod === 'POST')
  {
    try
    {
      // Process the POST request as needed}
      console.log(`\x1b[32mPixi!! :D\x1b[0m`)
      console.log(event.body);

      let text = event.body;
      console.log(text);

      if (event.isBase64Encoded)
      {
        console.log('is base64 encoded');
        const buff = Buffer.from(event.body, 'base64');
        console.log("Buff: ");
        console.log(buff);
        text = buff.toString('utf-8');
        console.log("----\nText: ");
        console.log(text);
      }


      const { prompt } = JSON.parse(text);
      console.log("prompt:", prompt);
      console.log("openai:");
      console.log(openai);

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
      });

      console.log("didnt break")
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