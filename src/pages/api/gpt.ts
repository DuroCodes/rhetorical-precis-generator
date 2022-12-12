/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';

const api = new ChatGPTAPI({
  sessionToken: process.env.SESSION_TOKEN!,
  clearanceToken: process.env.CLEARANCE_TOKEN!,
  markdown: false,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.article) {
    return res.status(400).json({ error: 'Missing Input' });
  }

  await api.ensureAuth();

  const prompt = `Write a rhetorical precis with this article: ${req.query.article}
      
  Using this format:
        
  A well-written rhetorical precis of a text need only be 4-5 sentences long. It’s how you pack the information into them that counts. DO NOT use direct quotes in a Rhetorical Precis. You are not presenting and defending evidence. 
        
  1st Sentence: Name of author, [optional: a phrase describing the author], the genre and title of the work, date in parentheses (additional publishing information in parentheses or note), a rhetorically accurate verb (such as "assert," "argue," "suggest," "imply," "claim," etc.), and a THAT clause containing the major assertion (thesis statement) of the work.
        
  2nd Sentence: An explanation of how the author develops and/or supports the thesis, usually in chronological order.
  
  3rd Sentence: A statement of the author’s apparent purpose, followed by an "in order to" phrase.
        
  4th Sentence: A description of the intended audience if it seems to be for a specific person or group, OR a brief statement of why you chose this article to analyze.`;

  const response = await api.sendMessage(prompt);

  if (!response) {
    return res.status(404).json({ error: 'Not Found' });
  }

  return res.status(200).json({ response });
};

export default handler;
