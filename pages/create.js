import Navigation from "@/components/Navigation";
import ProjectForm from "@/components/ProjectForm";

export default function CreatePage({ onAddProject, projects }) {
  return (
    <div>
      <ProjectForm onAddProject={onAddProject} projects={projects} />;
      <Navigation />;
    </div>
  );
}
