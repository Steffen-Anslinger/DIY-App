import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
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

export default function Projects({ projects, favourites, onToggleFavourite }) {
  return (
    <StyledList>
      {projects.map((project) => (
        <ProjectCard key={project._id}>
          <Link href={`/${project._id}`}>
            <Image
              src={project.image}
              width={150}
              height={150}
              alt={project.title}
            />
          </Link>
          <p>
            {project.title}
            <FavouriteButton
              onToggleFavourite={onToggleFavourite}
              id={project._id}
              favourites={favourites}
            />
          </p>
        </ProjectCard>
      ))}
    </StyledList>
  );
}
