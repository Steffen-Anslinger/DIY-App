import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Navigation from "@/components/Navigation";
import ProjectForm from "@/components/ProjectForm";
import useSWR from "swr";

export default function CreatePage() {
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
