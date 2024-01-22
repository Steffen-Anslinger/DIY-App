import dbConnect from "@/db/connect";
import Project from "@/db/models/ProjectSchema";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const project = await Project.findById(id);

    if (!project) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(project);
  }

  if (request.method === "PUT") {
    const updatedProject = request.body;
    await Project.findByIdAndUpdate(id, updatedProject);
    response.status(200).json({ status: `Project successfully updated!` });
  }
}
