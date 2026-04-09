export interface ProjectBrief {
  summary: string;
  recommendedFeatures: string[];
  estimatedTimeline: string;
  techStackRecommendation: string[];
  strategicInsight: string;
}

export const generateProjectScope = async (userIdea: string): Promise<ProjectBrief> => {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userIdea }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.text) {
      throw new Error("No response content received");
    }

    // The backend returns a JSON string inside the 'text' field
    return JSON.parse(data.text) as ProjectBrief;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};