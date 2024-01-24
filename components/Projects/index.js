import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "../FavouriteButton";
import ProjectCard from "../ProjectCard";
import { React } from "react";
import Masonry from "@mui/lab/Masonry";

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  filter: brightness(70%);
`;

const StyledCardTitle = styled.h2`
  position: absolute;
  bottom: 15px;
  left: 0;
  margin: 0;
  padding: 1rem;
  color: white;
  width: 100%;
`;

export default function Projects({ projects, favourites, onToggleFavourite }) {
  return (
    <StyledList>
      <Masonry columns={2} spacing={2}>
        {projects.map((project) => (
          <ProjectCard key={project._id}>
            <Link href={`/projects/${project._id}`}>
              <StyledImage
                src={project.image}
                width={150}
                height={150}
                alt={project.title}
              />
              <StyledCardTitle>{project.title}</StyledCardTitle>
            </Link>
            <FavouriteButton
              onToggleFavourite={onToggleFavourite}
              id={project._id}
              favourites={favourites}
            />
          </ProjectCard>
        ))}
      </Masonry>
    </StyledList>
  );
}
