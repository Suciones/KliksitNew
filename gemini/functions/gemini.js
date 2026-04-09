
export const handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    
    // STRICTLY use the environment variable. 
    // Do not fallback to hardcoded keys in production code.
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      console.error("Server Error: Missing GEMINI_API_KEY environment variable.");
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Server configuration error. API Key missing." }) 
      };
    }

    const systemInstruction = `
      You are a senior digital product strategist at Kliksit Agency. 
      Your goal is to take a rough client idea and turn it into a sophisticated, high-level project brief.
      Tone: Professional, concise, visionary, innovative.
      Avoid generic marketing fluff. Focus on value and execution.
    `;

    const fullPrompt = `
      Client Idea: "${prompt}"
      
      Please analyze this request and provide a structured brief.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemInstruction }
          },
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            response_mime_type: "application/json",
            response_schema: {
              type: "OBJECT",
              properties: {
                summary: { type: "STRING", description: "A 2-sentence professional summary of the project vision." },
                recommendedFeatures: { 
                  type: "ARRAY", 
                  items: { type: "STRING" },
                  description: "List of 4-5 high-impact features." 
                },
                estimatedTimeline: { type: "STRING", description: "E.g., '4-6 Weeks' or '2-3 Months'" },
                techStackRecommendation: { 
                  type: "ARRAY", 
                  items: { type: "STRING" },
                  description: "3-4 technologies (e.g., React, Node.js, Three.js)" 
                },
                strategicInsight: { type: "STRING", description: "One unique insight or strategic advantage this project could leverage." }
              },
              required: ["summary", "recommendedFeatures", "estimatedTimeline", "techStackRecommendation", "strategicInsight"]
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to communicate with AI service" }),
      };
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ text }), 
    };
  } catch (err) {
    console.error("Handler Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
