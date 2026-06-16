import { GoogleGenAI, Type } from "@google/genai";

// Fail-safe check for the Gemini API initialization
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userProfile, eventDetails } = request.body;

    // 🚨 1. Defensive Gate: Check if user profile data didn't pass correctly
    if (!userProfile || !eventDetails || !eventDetails.startDate) {
      return response.status(400).json({
        error:
          "Bad Request: Missing user profile or event details payload variables.",
      });
    }

    // 🚨 2. Defensive Gate: Check if environment variables are missing
    if (!ai) {
      console.error(
        "CRITICAL ERROR: GEMINI_API_KEY environment variable is not defined in .env.local"
      );
      return response.status(500).json({
        error:
          "Server configuration missing: GEMINI_API_KEY is not configured.",
      });
    }

    // Robust JavaScript Date object processing
    const parsedDate = new Date(eventDetails.startDate);
    const targetYear = !isNaN(parsedDate) ? parsedDate.getFullYear() : 2026;
    const targetMonth = !isNaN(parsedDate) ? parsedDate.getMonth() + 1 : 6;
    const targetDay = !isNaN(parsedDate) ? parsedDate.getDate() : 16;

    let realTransitData = "Could not fetch live ephemeris data.";

    try {
      // Only attempt fetch if the API Key is present to prevent silent authorization rejections
      if (process.env.ASTROLOGY_API_KEY) {
        const astroResponse = await fetch(
          "https://api.freeastrologyapi.com/v1/planets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.ASTROLOGY_API_KEY,
            },
            body: JSON.stringify({
              year: targetYear,
              month: targetMonth,
              day: targetDay,
              hours: 12,
              min: 0,
              lat: 52.52,
              lon: 13.405,
              tzone: 1.0,
            }),
          }
        );

        if (astroResponse.ok) {
          const astroJson = await astroResponse.json();
          if (astroJson && astroJson.output) {
            realTransitData = JSON.stringify(astroJson.output);
          }
        }
      }
    } catch (apiError) {
      console.error("External Astrology API fallback activated:", apiError);
    }

    const prompt = `
      You are an expert electional astrologer and data analyst.
      Calculate the 3 absolute best days for this event based on the following authenticated data.

      USER PROFILE:
      - Birth Date: ${userProfile.birthDate}
      - Birth Time: ${userProfile.birthTime || "Unknown"}
      - Sun Sign/Details: ${JSON.stringify(userProfile)}

      EVENT REQUIREMENTS:
      - Planning a: ${eventDetails.eventType}
      - Location: ${eventDetails.eventCity}, ${eventDetails.eventCountry}
      - Start Window: From ${eventDetails.startDate}
      - Look ahead timeframe: ${eventDetails.timeframe}
      - Weekend preference: ${eventDetails.onlyWeekends ? "ONLY weekends allowed" : "Any day of the week"}
      - Partner Sun Sign: ${eventDetails.partnerSunSign || "None provided"}

      REAL-TIME PLANETARY TRANSIT POSITIONS (Ground Truth):
      The current baseline planet coordinates for the start of this window are:
      ${realTransitData}

      Task: Project the forward paths from this planetary baseline data and select the 3 best dates starting on or after ${eventDetails.startDate} within the ${eventDetails.timeframe} window.
      For each date, calculate a cosmic score from 0 to 100 based on transits matching their profile and event type.
      Provide a reading summary explaining why it is a good day astrologically (around 50 words).
    `;

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
                    description: "Astrological reading summary",
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
    console.error("Gemini API Error details:", error);
    return response
      .status(500)
      .json({
        error: "Failed to compute cosmic transits.",
        details: error.message,
      });
  }
}
