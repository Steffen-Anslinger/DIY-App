import React from "react";
import Image from "next/image";
import FavouriteButton from "../FavouriteButton";
import styled from "styled-components";
import color from "@/utils/Colors";

const StyledCardTitle = styled.h2`
  margin: 0;
  color: white;
  width: 100%;
  height: fit-content;
`;

const Tagline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const Tag = styled.p`
  background: ${color.orange[600]};
  max-width: 100px;
  border-radius: 5px;
  padding: 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  color: ${color.grey[50]};
  font-weight: 500;
`;

const FavouriteWrapper = styled.div`
  scale: 150%;
`;

const Container = styled.div`
  display: flex;
  align-content: space-between;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  padding: 20px;
  z-index: 1;
  justify-content: end;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: fit-content;
`;

const DetailWrapper = styled.div`
  padding-top: 25px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export default function ProjectDetails({
  project,
  onToggleFavourite,
  isFavourite,
  favourites,
}) {
  return (
    <DetailWrapper>
      <ImageWrapper>
        <StyledImage
          src={project.cover.url}
          height={200}
          width={400}
          alt={project.title}
        />
        <Container>
          <FavouriteWrapper>
            <FavouriteButton
              onToggleFavourite={onToggleFavourite}
              id={project._id}
              favourites={favourites}
              isFavourite={isFavourite}
            />
          </FavouriteWrapper>
          <StyledCardTitle>{project.title}</StyledCardTitle>
        </Container>
      </ImageWrapper>

      <p>{project.description}</p>
      <Tagline>
        <strong>Duration:</strong>
        <Tag>{project.duration}</Tag>
        &nbsp;
        <strong> Difficulty:</strong>
        <Tag>{project.difficulty}</Tag>
      </Tagline>
      {project.materials && (
        <ul>
          <h3>Material</h3>
          {project.materials.map((materials, index) => (
            <li key={index}>
              {materials.amount} {materials.material}
            </li>
          ))}
        </ul>
      )}
      <>
        {project.instructions && (
          <ol>
            <h3>Instructions</h3>
            {project.instructions.map((instructions, index) => (
              <li key={index}>{instructions.steps}</li>
            ))}
          </ol>
        )}
      </>
    </DetailWrapper>
  );
}
