import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export interface ProjectBrief {
  summary: string;
  recommendedFeatures: string[];
  estimatedTimeline: string;
  techStackRecommendation: string[];
  strategicInsight: string;
}

export const generateProjectScope = async (userIdea: string): Promise<ProjectBrief> => {
  try {
    const ai = getAIClient();
    const model = "gemini-2.5-flash";

    const systemInstruction = `
      You are a senior digital product strategist at Kliksit Agency. 
      Your goal is to take a rough client idea and turn it into a sophisticated, high-level project brief.
      Tone: Professional, concise, visionary, innovative.
      Avoid generic marketing fluff. Focus on value and execution.
    `;

    const prompt = `
      Client Idea: "${userIdea}"
      
      Please analyze this request and provide a structured brief.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A 2-sentence professional summary of the project vision." },
            recommendedFeatures: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 4-5 high-impact features." 
            },
            estimatedTimeline: { type: Type.STRING, description: "E.g., '4-6 Weeks' or '2-3 Months'" },
            techStackRecommendation: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-4 technologies (e.g., React, Node.js, Three.js)" 
            },
            strategicInsight: { type: Type.STRING, description: "One unique insight or strategic advantage this project could leverage." }
          },
          required: ["summary", "recommendedFeatures", "estimatedTimeline", "techStackRecommendation", "strategicInsight"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ProjectBrief;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};