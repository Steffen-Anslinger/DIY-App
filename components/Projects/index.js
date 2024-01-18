import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import StyledSection from "../Layout/StyledSection";
import FavouriteButton from "../FavouriteButton";

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

export default function Projects({ projects }) {
  return (
    <StyledSection>
      <StyledList>
        {projects.map((project) => (
          <ProjectCard key={project.slug}>
            <Link href={`/projects/${project.slug}`}>
              <Image
                src={project.image}
                width={150}
                height={150}
                alt={project.title}
              />
            </Link>
            <p>
              {project.title} <FavouriteButton />
            </p>
          </ProjectCard>
        ))}
      </StyledList>
    </StyledSection>
  );
}
