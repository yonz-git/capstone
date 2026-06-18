import dbConnect from "@/db/connect";
import SavedDate from "@/db/models/saved_dates";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const savedDates = await SavedDate.find();
      return response.status(200).json(savedDates);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const savedDateData = request.body;
      await SavedDate.create(savedDateData);

      return response.status(201).json({ status: "Date saved successfully" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.body;
      await SavedDate.findByIdAndDelete(id);

      return response.status(200).json({ status: "Date removed successfully" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
