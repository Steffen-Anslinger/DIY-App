import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "../FavouriteButton";
import Masonry from "react-masonry-css";
import ProjectCard from "../ProjectCard";
import { React } from "react";

const StyledList = styled(Masonry)`
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: -webkit-box;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
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
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <StyledList
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {projects.map((project) => (
        <ProjectCard key={project._id}>
          <Link href={`/projects/${project._id}`}>
            <StyledImage
              src={project.image}
              width={150}
              height={150}
              alt={project.title}
            />
          </Link>
          <FavouriteButton
            onToggleFavourite={onToggleFavourite}
            id={project._id}
            favourites={favourites}
          />
          <StyledCardTitle>{project.title}</StyledCardTitle>
        </ProjectCard>
      ))}
    </StyledList>
  );
}
