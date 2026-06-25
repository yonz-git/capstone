import dbConnect from "@/db/connect";
import SavedDate from "@/db/models/saved_dates";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const savedDates = await SavedDate.find();

    return response.status(200).json(savedDates);
  }

  if (request.method === "POST") {
    try {
      const savedDateData = request.body;
      await SavedDate.create(savedDateData);
      return response.status(201).json({ status: "Date saved successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
