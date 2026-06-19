import mongoose from "mongoose";

const SavedDateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: [true, "A session tracking ID is required."],
    },
    gregorianDate: {
      type: Date,
      required: [true, "A calendar date string is required."],
    },
    eventType: {
      type: String,
      required: [true, "The event type selection is required."],
    },
    eventCountry: {
      type: String,
      required: [true, "The country location is required."],
    },
    eventCity: {
      type: String,
      required: [true, "The city location is required."],
    },
    cosmicScore: {
      type: Number,
      required: [true, "The cosmic score rating is required."],
      min: [0, "Score cannot be below 0."],
      max: [100, "Score cannot exceed 100."],
    },
    readingSummary: {
      type: String,
      required: [true, "The AI summary reading text is required."],
    },
    notes: {
      type: String,
      default: "",
    },
    // OPTIONAL FIELD: Only saved when checking a dual-compatibility event (wedding or dates)
    partnerSunSign: {
      type: String,
      lowercase: true,

      default: null, // If they don't provide a partner, it sits cleanly as null
    },
  },
  {
    // Automatically injects and handles 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Explicitly mapping to your professional lowercase "saved_dates" collection
const SavedDate =
  mongoose.models.SavedDate ||
  mongoose.model("SavedDate", SavedDateSchema, "saved_dates");

export default SavedDate;
