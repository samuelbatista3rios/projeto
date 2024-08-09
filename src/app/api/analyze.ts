import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const analyzeJobDescription = async (description: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [
        {
          role: 'user',
          content: `Analyze the following job description and provide a detailed study roadmap:\n\n${description}`,
        },
      ],
      max_tokens: 1000, 
    });

    // Extraindo o resultado do response
    const result = response.choices[0]?.message?.content || 'No result';
    return result;
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    throw new Error('Failed to fetch data from OpenAI');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { jobDescription } = req.body;

      if (typeof jobDescription !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const result = await analyzeJobDescription(jobDescription);
      res.status(200).json({ result });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
