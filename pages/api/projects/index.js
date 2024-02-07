import Project from "@/db/models/ProjectSchema";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "GET") {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return response.status(200).json(projects);
  }
  if (session && request.method === "POST") {
    try {
      const newProject = request.body;
      await Project.create({ ...newProject, author: session.user.name });
      return response.status(201).json({ status: "Project created" });
    } catch (error) {
      console.error(error);
      alert({ error: error.message });
    }
  } else {
    alert(`Method not allowed!`);
  }
}
