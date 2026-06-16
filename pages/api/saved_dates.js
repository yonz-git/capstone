import dbConnect from "@/db/connect";
import SavedDate from "@/db/models/saved_dates";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const allSavedDates = await SavedDate.find({});
      response.status(200).json(allSavedDates);
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}
