import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is handled securely
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getBeautyAdvice = async (topic: string, userProfile: any): Promise<string> => {
  if (!ai) return "Simulated: API Key not configured. (Please configure API_KEY)";

  try {
    const model = ai.models.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using recommended flash model for text
    const prompt = `
      Atue como um especialista em beleza pessoal e inclusiva para o app Skinovaai.
      Perfil do usuário: Pele ${userProfile.skinType}, Tom ${userProfile.skinTone}, Objetivos: ${userProfile.goals.join(', ')}.
      
      Por favor, dê um conselho curto, motivador e técnico sobre: ${topic}.
      Mantenha o tom divertido, Geração Z, e encorajador. Máximo 50 palavras.
    `;

    const result = await model.generateContent({ contents: prompt });
    const response = result.response;
    return response.text ?? "Não consegui gerar uma dica agora, mas você está brilhando!";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Dica do dia: Beba água e use protetor solar!";
  }
};

export const analyzeFaceImage = async (base64Image: string): Promise<string> => {
    if (!ai) return "Simulated Analysis: Pele Mista, Tom Médio Quente.";
    
    // This is a placeholder for actual image analysis logic using Gemini Vision capabilities
    // In a real implementation, we would send the image part to gemini-2.5-flash-image
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Análise IA: Detectamos subtom neutro e pele com tendência à hidratação.");
        }, 1500);
    });
}