import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "../FavouriteButton";
import ProjectCard from "../ProjectCard";
import { React } from "react";
import Masonry from "@mui/lab/Masonry";
import color from "../Layout/Colors";
import { createTheme } from "@mui/material/styles";

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  min-height: 150px;
  object-fit: cover;
  border-radius: 5px;
  filter: brightness(70%);
`;

const StyledCardTitle = styled.h2`
  margin: 0;
  color: white;
  width: 100%;
  height: fit-content;

  @media (max-width: 100px) {
    font-size: medium;
  }
  @media (max-width: 200px) {
    font-size: large;
  }
`;

const Container = styled.div`
  display: flex;
  align-content: space-between;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  padding: 12px;
  z-index: 1;
  gap: 5px;
  flex-wrap: wrap;
`;

const TagButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
  flex-wrap: wrap;
  height: fit-content;
`;

const TagLine = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  height: fit-content;
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

  @media (max-width: 200px) {
    font-size: xx-small;
  }
  @media (max-width: 400px) {
    font-size: small;
  }
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

  @media (max-width: 200px) {
    font-size: xx-small;
  }
  @media (max-width: 400px) {
    font-size: small;
  }
`;

const customBreakpoints = {
  values: {
    xs: 0,
    sm: 400,
    md: 600,
    lg: 960,
    xl: 1280,
    custom: 1600,
  },
};

const theme = createTheme({
  breakpoints: customBreakpoints,
});

export default function Projects({ projects, favourites, onToggleFavourite }) {
  return (
    <StyledList>
      <Masonry theme={theme} columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {projects.map((project) => (
          <ProjectCard key={project._id}>
            <Link href={`/projects/${project._id}`}>
              <StyledImage
                src={project.cover.url}
                width={150}
                height={150}
                alt={project.title}
              />
              <Container>
                <TagButtonLine>
                  <TagLine>
                    <TagDuration>{project.duration}</TagDuration>
                    <TagDifficulty>{project.difficulty}</TagDifficulty>
                  </TagLine>
                  <FavouriteButton
                    onToggleFavourite={onToggleFavourite}
                    id={project._id}
                    favourites={favourites}
                  />
                </TagButtonLine>
                <StyledCardTitle>{project.title}</StyledCardTitle>
              </Container>
            </Link>
          </ProjectCard>
        ))}
      </Masonry>
    </StyledList>
  );
}
