import { GoogleGenAI } from "@google/genai";

const getWittyFeedback = async (
    guess: number, 
    answer: number, 
    attempts: number, 
    status: 'high' | 'low' | 'correct'
): Promise<string> => {
  // IMPORTANT: The API key is injected automatically from the environment.
  // Do not add it here.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const statusDescription = {
    high: `My guess of ${guess} was too high.`,
    low: `My guess of ${guess} was too low.`,
    correct: `My guess of ${guess} was correct! It took me ${attempts} attempts.`
  };

  const prompt = `
    You are a fun and witty game show host for a 'guess the number' game.
    The secret number is ${answer}. This is my attempt number ${attempts}.
    ${statusDescription[status]}

    Give me a very short, witty, and encouraging one-sentence response.
    - If my guess was correct, be celebratory.
    - If my guess was too high, gently tease me for overshooting.
    - If my guess was too low, encourage me to aim higher.
    - Keep it under 15 words. Be punchy and fun.
    - Do NOT reveal the secret number in your response unless the guess was correct.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("AI API call failed:", error);
    if (status === 'correct') {
      return "You're a genius! Congratulations!";
    }
    return "You're getting closer, I can feel it!";
  }
};

export { getWittyFeedback };