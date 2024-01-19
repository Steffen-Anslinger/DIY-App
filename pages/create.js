import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Navigation from "@/components/Navigation";
import ProjectForm from "@/components/ProjectForm";

export default function CreatePage({ onAddProject, projects }) {
  return (
    <>
      <Header />
      <StyledSection>
        <ProjectForm onAddProject={onAddProject} projects={projects} />
      </StyledSection>
      <Navigation />
    </>
  );
}
