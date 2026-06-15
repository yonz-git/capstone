import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    birthDate: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    birthTime: {
      type: String,
      required: [true, "Birth time is required"],
    },
    birthPlace: {
      city: {
        type: String,
        required: [true, "Birth city is required"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Birth country code is required"],
        uppercase: true,
        trim: true,
      },
    },
  },
  {
    // automatically injects and handles your 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// 3. Prevent Mongoose from creating duplicate models during Next.js hot-reloads.
// We explicitly pass "UserProfile" as the third argument to bind it directly to your existing Atlas collection
const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema, "UserProfile");

export default UserProfile;
