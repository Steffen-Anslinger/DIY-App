import connect, { disconnect } from "./db/connect.js";
import Project from "./db/models/Project.js";
import probe from "probe-image-size";

async function run() {
  await connect();
  const projects = await Project.find();
  await Promise.all(
    projects
      .filter((project) => !project.cover) // select all projects without cover info
      .map(async (project) => {
        const info = await probe(project.image);
        console.log(`Cover info for project ${project.id}`, info);
        project.cover = {
          url: project.image,
          width: info.width,
          height: info.height,
        };
        await project.save();
      })
  );
  await disconnect();
}

run();
