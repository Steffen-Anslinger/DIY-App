import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import FavouriteButton from "@/components/FavouriteButton";
import styled from "styled-components";
import color from "@/utils/Colors";
import { React } from "react";
import Masonry from "@mui/lab/Masonry";
import { createTheme } from "@mui/material/styles";
import LoginButton from "@/components/LoginButton";
import InfoSVG from "@/components/Design/SVGs/InfoIcon";
import InfoBanner from "@/components/Design/StyledBanner";

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

const StyledProfileImage = styled(Image)`
  border-radius: 50%;
`;

const StyledCardTitle = styled.h2`
  margin: 0;
  color: white;
  width: 100%;
  height: fit-content;
  @media (max-width: 100px) {
    font-size: small;
  }
  @media (max-width: 400px) {
    font-size: medium;
  }
`;
const Container = styled.div`
  display: flex;
  align-content: space-between;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
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
  flex-wrap: nowrap;
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
    sm: 300,
    md: 600,
    lg: 960,
    xl: 1280,
    custom: 1600,
  },
};
const theme = createTheme({
  breakpoints: customBreakpoints,
});

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const PageWrapper = styled.div`
  margin: 10px;
`;

export default function ProfilePage({
  projects,
  favourites,
  onToggleFavourite,
}) {
  const { data: session } = useSession();
  console.log(session);

  if (!session) {
    return (
      <>
        <InfoBanner>
          <InfoSVG />
          <h2>
            You are not logged in. Please Login to see your projects and
            profile!
          </h2>
          <LoginButton />
        </InfoBanner>
      </>
    );
  }
  const myProjects = projects.filter(
    (project) => project.author === session.user.name
  );

  return (
    <PageWrapper>
      <h1>Profile Page</h1>
      <ProfileWrapper>
        <StyledProfileImage
          src={session.user.image}
          height={175}
          width={175}
          alt="user-picture"
        />
        <h2>{session.user.name}</h2>
      </ProfileWrapper>
      <h3>My Projects</h3>
      <StyledList>
        <Masonry theme={theme} columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {myProjects.map((project) => (
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
    </PageWrapper>
  );
}
