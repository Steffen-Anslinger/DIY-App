import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Navigation from "@/components/Navigation";
import ProjectForm from "@/components/ProjectForm";
import useSWR from "swr";

export default function CreatePage() {
  // const { mutate } = useSWR("/api/projects");

  // async function handleAddProject(newProjectData) {
  //   try {
  //     const response = await fetch("/api/projects", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newProjectData),
  //     });

  //     if (response.ok) {
  //       mutate();
  //     } else {
  //       console.error(`Failed to add project. Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error adding project:", error);
  //   }
  // }

  return (
    <>
      <Header />
      <StyledSection>
        <ProjectForm />
      </StyledSection>
      <Navigation />
    </>
  );
}
