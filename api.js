require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event, context) =>
{
  if (event.httpMethod === 'GET')
  {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pixi loves you!' }),
    }
    /*try
    {
      // Process the GET request as needed
      const data = require('./db.json');

      // Return the data as the response
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error)
    {
      // Return an error response if there was an issue processing the request
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process GET request' }),
      };
    }*/
  }
};