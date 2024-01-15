import { initialProjects } from "@/lib/data";
import styled from "styled-components";
import Image from "next/image";

const StyledSection = styled.section`
  margin: 0 auto;
  max-width: 650px;
`;

const ProjectCard = styled.li`
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(50% - 1rem);
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const StyledList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

export default function Projects() {
  return (
    <StyledSection>
      <StyledList>
        {initialProjects.map((project) => (
          <ProjectCard key={project.slug}>
            {" "}
            <Image
              src={project.image}
              width={150}
              height={150}
              alt={project.title}
            />{" "}
            {project.title}
          </ProjectCard>
        ))}
      </StyledList>
    </StyledSection>
  );
}
