import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const chat = new ChatOpenAI({
  temperature: 0.7,
  modelName: 'gpt-3.5-turbo',
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(question: string): Promise<string> {
  const response = await chat.call([
    new SystemMessage('Du är en hjälpsam AI-assistent för utvecklare.'),
    new HumanMessage(question),
  ]);

  return response.text;
}
