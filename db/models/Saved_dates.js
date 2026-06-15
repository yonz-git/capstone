import mongoose from "mongoose";

const SavedDateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile", // Links this saved date back to the owner's profile
      required: [true, "A saved date must be linked to a user profile."],
    },
    gregorianDate: {
      type: Date,
      required: [true, "The calendar date is required."],
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
      trim: true,
    },
  },
  {
    // Automatically injects and handles 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// We explicitly map it to your lowercase "saved_dates" collection name as the third parameter
const SavedDate =
  mongoose.models.SavedDate ||
  mongoose.model("SavedDate", SavedDateSchema, "saved_dates");

export default SavedDate;
