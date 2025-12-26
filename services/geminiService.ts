
import { GoogleGenAI, Type } from "@google/genai";
import { Artwork, Exhibition } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  curateExhibitions: async (artworks: Artwork[]): Promise<Partial<Exhibition>[]> => {
    if (!process.env.API_KEY) {
        console.error("API Key is missing. Curation will fail.");
        return [];
    }

    const artData = artworks.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description
    }));

    const prompt = `Act as an expert art gallery curator. Analyze the following collection of artworks and group them into 3 distinct thematic exhibitions.
    For each exhibition, provide:
    1. A catchy, professional Exhibition Title.
    2. A deep, poetic theme description (2-3 sentences).
    3. A list of artwork IDs that fit this theme.
    
    Artworks: ${JSON.stringify(artData)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              themeDescription: { type: Type.STRING },
              artworkIds: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "themeDescription", "artworkIds"]
          }
        }
      }
    });

    try {
      const result = JSON.parse(response.text);
      return result.map((item: any) => ({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        status: 'draft',
        curatedAt: Date.now()
      }));
    } catch (e) {
      console.error("Failed to parse AI response", e);
      return [];
    }
  }
};
