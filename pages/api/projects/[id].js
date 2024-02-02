import dbConnect from "@/db/connect";
import Project from "@/db/models/ProjectSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const project = await Project.findById(id);

    if (!project) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(project);
  }

  if (session && request.method === "PUT") {
    const updatedProject = request.body;
    await Project.findByIdAndUpdate(id, updatedProject);
    response.status(200).json({ status: `Project successfully updated!` });
  }

  if (session && request.method === "DELETE") {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      response.status(200).json({ status: `Project successfully deleted.` });
    } else {
      response.status(404).json({ status: `Project could not be deleted.` });
    }
  }
}
