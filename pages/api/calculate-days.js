import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userProfile, eventDetails } = request.body;

    // PROMPT
    const prompt = `
      You are an expert electional astrologer and data analyst.
      Calculate the 3 absolute best days for this event based on the following data:

      USER PROFILE:
      - Birth Date: ${userProfile.birthDate}
      - Birth Time: ${userProfile.birthTime || "Unknown"}
      - Sun Sign/Details: ${JSON.stringify(userProfile)}

      EVENT REQURIEMENTS:
      - Planning a: ${eventDetails.eventType}
      - Location: ${eventDetails.eventCity}, ${eventDetails.eventCountry}
      - Start Window: From ${eventDetails.startDate}
      - Look ahead timeframe: ${eventDetails.timeframe}
      - Weekend preference: ${eventDetails.onlyWeekends ? "ONLY weekends allowed" : "Any day of the week"}
      - Partner Sun Sign: ${eventDetails.partnerSunSign || "None provided"}

      Task: Select the 3 best dates starting on or after ${eventDetails.startDate} within the ${eventDetails.timeframe} window.
      For each date, calculate a cosmic score from 0 to 100 based on transits matching their profile and event type.
      Provide a reading summary explaining why it is a good day astrologically (around 50 words).
    `;

    // Call Gemini with structured JSON output enforcement
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestDays: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING, description: "YYYY-MM-DD format" },
                  score: {
                    type: Type.INTEGER,
                    description: "Cosmic match score 0-100",
                  },
                  summary: {
                    type: Type.STRING,
                    description:
                      "Astrological reading summary (approx. 50 words)",
                  },
                },
                required: ["date", "score", "summary"],
              },
            },
          },
          required: ["bestDays"],
        },
      },
    });

    const resultData = JSON.parse(aiResponse.text);
    return response.status(200).json(resultData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return response
      .status(500)
      .json({ error: "Failed to compute cosmic transits." });
  }
}
