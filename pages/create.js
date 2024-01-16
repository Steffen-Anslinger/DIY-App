import ProjectForm from "@/components/ProjectForm";

export default function CreatePage({ onAddProject, projects }) {
  return (
    <>
      <ProjectForm onAddProject={onAddProject} projects={projects} />
    </>
  );
}
