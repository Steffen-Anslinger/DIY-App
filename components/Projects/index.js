import { initialProjects } from "@/lib/data";
import styled from "styled-components";
import Image from "next/image";

const ProjectCard = styled.li`
  list-style: none;
  background-color: lightgray;
  width: 50%;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  columns: 2;
`;

export default function Projects() {
  return (
    <StyledList>
      {initialProjects.map((project) => (
        <ProjectCard key={project.slug}>
          {" "}
          <Image
            src={project.image}
            width={200}
            height={200}
            alt={project.title}
          />{" "}
          {project.title}
        </ProjectCard>
      ))}
    </StyledList>
  );
}
