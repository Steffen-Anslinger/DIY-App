import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "../FavouriteButton";
import ProjectCard from "../ProjectCard";
import { React } from "react";
import Masonry from "@mui/lab/Masonry";
import color from "../Layout/Colors";

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-top: 90px;
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

const TagLine = styled.div`
  display: flex;
  position: absolute;
  top: 12px;
  left: 6%;
  z-index: 1;
  gap: 5px;
`;

const TagDuration = styled.p`
  background: rgba(255, 255, 255, 0.6);
  max-width: 100px;
  border-radius: 5px;
  padding: 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  color: ${color.grey[950]};
  font-weight: 500;
`;
const TagDifficulty = styled.p`
  background: rgba(255, 255, 255, 0.6);
  max-width: 100px;
  border-radius: 5px;
  padding: 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  color: ${color.grey[950]};
  font-weight: 500;
`;

export default function Projects({ projects, favourites, onToggleFavourite }) {
  return (
    <StyledList>
      <Masonry columns={2} spacing={2}>
        {projects.map((project) => (
          <ProjectCard key={project._id}>
            <Link href={`/projects/${project._id}`}>
              <TagLine>
                <TagDuration>{project.duration}</TagDuration>
                <TagDifficulty>{project.difficulty}</TagDifficulty>
              </TagLine>
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
