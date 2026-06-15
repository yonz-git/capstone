import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile", // Connects this ID back to your UserProfile schema blueprint
      required: [true, "A partner must be linked to a user profile."],
    },
    sunSign: {
      type: String,
      required: [true, "Partner sun sign is required."],
      lowercase: true, // Automatically converts input strings to lowercase (e.g., "Scorpio" -> "scorpio")
      trim: true, // Automatically strips trailing or leading whitespace spaces
    },
  },
  {
    // Automatically injects and updates 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// We explicitly map it to your lowercase "partners" collection name as the third parameter
const Partner =
  mongoose.models.Partner ||
  mongoose.model("Partner", PartnerSchema, "partners");

export default Partner;
