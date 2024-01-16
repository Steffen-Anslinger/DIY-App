import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";
export default function CreatePage({ onAddProject, projects }) {
  return (
    <>
      <h2>Create new project</h2>
      <Link href="/">
        <button>Back</button>
      </Link>
      <ProjectForm onAddProject={onAddProject} projects={projects} />
    </>
  );
}
