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
  filter: brightness(70%);
`;

const StyledMIWrapper = styled.div`
  background-color: ${color.grey[100]};
  border-radius: 5px;
  padding: 5px 0px;
  margin: 20px 0px;
`;

const StyledText = styled.div`
  margin: 5px;
`;

const StyledMaterials = styled.ul`
  list-style: none;
  padding-left: 10px;
`;

const StyledInstructions = styled.ol`
  padding-left: 10px;
`;

const StyledListElement = styled.li`
  padding-left: 5px;
  margin-left: 20px;
  margin-bottom: 5px;
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
      <StyledText>
        <p>{project.description}</p>
        <Tagline>
          <strong>Duration:</strong>
          <Tag>{project.duration}</Tag>
          &nbsp;
          <strong> Difficulty:</strong>
          <Tag>{project.difficulty}</Tag>
        </Tagline>
        <StyledMIWrapper>
          {project.materials && (
            <StyledMaterials>
              <h3>Material</h3>
              {project.materials.map((materials, index) => (
                <li key={index}>
                  <input type="checkbox" />
                  {materials.amount} {materials.material}
                </li>
              ))}
            </StyledMaterials>
          )}

          {project.instructions && (
            <StyledInstructions>
              <h3>Instructions</h3>
              {project.instructions.map((instructions, index) => (
                <StyledListElement key={index}>
                  {instructions.steps}
                </StyledListElement>
              ))}
            </StyledInstructions>
          )}
        </StyledMIWrapper>
      </StyledText>
    </DetailWrapper>
  );
}
