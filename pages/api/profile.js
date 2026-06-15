import dbConnect from "../../db/dbConnect";
import UserProfile from "../../db/models/UserProfile";

export default async function handler(request, response) {
  // Establish database connection using the cached utility
  await dbConnect();

  const { method } = request;

  switch (method) {
    case "GET":
      try {
        // Fetch the user data profile from the database
        const profile = await UserProfile.findOne().sort({ createdAt: -1 });

        if (!profile) {
          return response.status(404).json({
            success: false,
            error: "Cosmic profile not found. Please create one first.",
          });
        }

        return response.status(200).json({ success: true, data: profile });
      } catch (error) {
        return response
          .status(400)
          .json({ success: false, error: error.message });
      }

    case "POST":
      try {
        const { birthDate, birthTime, birthPlace } = request.body;

        // Validation check to ensure no blank metrics are processed
        if (
          !birthDate ||
          !birthTime ||
          !birthPlace?.city ||
          !birthPlace?.country
        ) {
          return response.status(400).json({
            success: false,
            error: "Missing required fields. The stars require exact metrics.",
          });
        }

        // Upsert logic: find a profile entry and update it, or create a brand new one if it's empty
        const updatedProfile = await UserProfile.findOneAndUpdate(
          {},
          { birthDate, birthTime, birthPlace },
          { new: true, upsert: true, runValidators: true }
        );

        return response
          .status(201)
          .json({ success: true, data: updatedProfile });
      } catch (error) {
        return response
          .status(400)
          .json({ success: false, error: error.message });
      }

    default:
      // Handle unsupported HTTP request types gracefully
      response.setHeader("Allow", ["GET", "POST"]);
      return response.status(405).end(`Method ${method} Not Allowed`);
  }
}
