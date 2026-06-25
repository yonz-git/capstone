import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

// Configure OpenAI SDK to securely route to Groq instead
const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1", // Redirects traffic to Groq
    })
  : null;

//mock data
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userProfile, eventDetails } = request.body;

    // Defensive Gate: Check if user profile data didn't pass correctly
    if (!userProfile || !eventDetails || !eventDetails.startDate) {
      return response.status(400).json({
        error:
          "Bad Request: Missing user profile or event details payload variables.",
      });
    }

    // Defensive Gate 2: Check if environment variables are missing
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

    const lat = eventDetails.latitude || eventDetails.lat || 52.52;
    const lon = eventDetails.longitude || eventDetails.lon || 13.405;
    const weatherMatters = eventDetails.weatherMatters;

    let realTransitData = "Could not fetch live ephemeris data.";
    let weatherDataText = "No weather data available for this date range.";

    const daysDifference =
      (new Date(parsedDate) - new Date()) / (1000 * 60 * 60 * 24);

    // ONLY fetch weather if the date is within 14 days AND the checkbox is ticked
    if (weatherMatters && daysDifference >= 0 && daysDifference <= 14) {
      if (!lat || !lon) {
        return response.status(400).json({
          error:
            "Bad Request: Coordinates are required when weather preferences are enabled.",
        });
      }

      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,precipitation_probability_max,weather_code&forecast_days=14`
        );
        if (weatherResponse.ok) {
          const weatherJson = await weatherResponse.json();
          weatherDataText = JSON.stringify(weatherJson.daily);
        }
      } catch (error) {
        console.error("Weather fetch failed, proceeding without it.");
        weatherDataText =
          "Weather lookup failed, but user prefers good weather.";
      }
    }

    try {
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
              lat: lat || 52.52,
              lon: lon || 13.405,
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
    const isProfessional = eventDetails.eventType
      ?.toLowerCase()
      .includes("professional");
    // Force strict schema descriptions directly in the text prompt string for Groq's fallback path
    const prompt = `
      You are an expert electional astrologer and data analyst.
      Calculate the 3 absolute best days for this event based on the following authenticated data.

      USER PROFILE:
      - Birth Date: ${userProfile.birthDate}
      - Birth Time: ${userProfile.birthTime || "Unknown"}
      - Sun Sign/Details: ${JSON.stringify(userProfile)}
      - Forecasted Weather Data: ${weatherDataText}

      CRITERIA:
  If the user indicates weather matters to them, adjust your total cosmic score downward if severe storms, heavy rain, or freezing temp conflicts with their event type (e.g., an outdoor date or wedding). Combine planetary alignment friction with weather realities to determine if it really "Is or Is Not their day".

      EVENT REQUIREMENTS:
      - Planning a: ${eventDetails.eventType}
      - Location: ${eventDetails.eventCity}, ${eventDetails.eventCountry}
      - Start Window: From ${eventDetails.startDate}
      - Look ahead timeframe: ${eventDetails.timeframe}
      - Weekend preference: ${eventDetails.onlyWeekends ? "ONLY weekends allowed" : "Any day of the week"}
      - Partner Sun Sign: ${eventDetails.partnerSunSign || "None provided"}
      
      CRITICAL DATE SELECTION RULE:
${
  eventDetails.onlyWeekends
    ? "-> CRITICAL FORCED CONSTRAINT: The user checked ONLY weekends. You ARE STRICTLY FORBIDDEN from choosing any day that is not a Saturday or a Sunday. Every single 'date' property in your JSON output MUST be a Saturday or a Sunday."
    : ""
}
      
${
  eventDetails.eventType === "professional" && !eventDetails.onlyWeekends
    ? `-> CRITICAL REQUIREMENT: Because this is a Professional Meeting, you MUST NOT under any circumstance select a Saturday or a Sunday. All 3 chosen bestDays MUST fall strictly on weekdays (Monday through Friday).
    
-> HARSH CONSTRAINT - EVENT IS PROFESSIONAL: 
The user is checking a "${eventDetails.eventType}". 
You ARE STRICTLY FORBIDDEN from choosing a Saturday or Sunday for any of the 3 dates. 
Double-check your calendar math: All 3 "date" properties in the JSON MUST fall exclusively on Monday, Tuesday, Wednesday, Thursday, or Friday.`
    : ""
}



      REAL-TIME PLANETARY TRANSIT POSITIONS (Ground Truth):
      The current baseline planet coordinates for the start of this window are:
      ${realTransitData}

      Task: Project the forward paths from this planetary baseline data and select the 3 best dates starting on or after ${eventDetails.startDate} within the ${eventDetails.timeframe} window.
      For each date, calculate a cosmic score from 0 to 100 based on transits matching their profile and event type.
      Provide a reading summary explaining why it is a good day astrologically (around 80 words).

      CRITICAL SYSTEM REQUIREMENT: You must return a valid, clean JSON object. 
      The root object MUST contain exactly one key named "bestDays" containing an array of 3 objects.
      Do not include any pre-text, markdown syntax markers, or post-text commentary.

      EXPECTED JSON STRUCTURE:
      {
        "bestDays": [
          {
            "date": "YYYY-MM-DD",
            "score": 85,
            "summary": "A brief 50-word astrological explanation goes here."
          }
        ]
      }
    `;

    let finalJsonResult = null;

    try {
      console.log("Attempting cosmic calculation via Gemini...");
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
                    date: {
                      type: Type.STRING,
                      description: "YYYY-MM-DD format",
                    },
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

      const textOutput = aiResponse.text();
      if (textOutput) {
        finalJsonResult = JSON.parse(textOutput);
        console.log("✅ Successfully computed using Gemini.");
      }
    } catch (geminiError) {
      console.warn(
        "⚠️ Gemini hit a limit. Switching to Groq free-tier backup...",
        geminiError.message
      );

      if (!groq) {
        throw new Error(
          "Gemini failed and Groq backup configuration is missing."
        );
      }

      console.log("Computing via Groq Fallback (llama-3.3-70b-versatile)...");
      const groqResponse = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const groqText = groqResponse.choices[0].message.content;
      if (groqText) {
        finalJsonResult = JSON.parse(groqText);
        console.log("🎉 Successfully computed using Groq Free Fallback!");
      }
    }

    if (finalJsonResult && finalJsonResult.bestDays) {
      return response.status(200).json(finalJsonResult);
    } else {
      throw new Error(
        "The returned calculation data payload was malformed or empty."
      );
    }
  } catch (error) {
    console.error("Endpoint execution failure details:", error);
    return response.status(500).json({
      error: "Failed to compute cosmic transits.",
      details: error.message,
    });
  }
}
