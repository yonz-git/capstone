import dbConnect from "@/db/connect";
import SavedDate from "@/db/models/saved_dates";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const savedDates = await SavedDate.findById(id);

      if (!savedDates) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(savedDates);
      return;
    }

    if (request.method === "PUT") {
      const updatedDates = request.body;
      await SavedDate.findByIdAndUpdate(id, updatedDates);

      response.status(200).json({ message: "Edited" });
      return;
    }

    if (request.method === "DELETE") {
      await SavedDate.findByIdAndDelete(id);

      response.status(200).json({ message: "Deleted" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
