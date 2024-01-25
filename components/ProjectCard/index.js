import styled from "styled-components";

const ProjectCard = styled.li`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: fit-content;

  width: 100%;

  @media (min-width: 400px) {
    width: 50%;
  }

  @media (min-width: 850px) {
    width: 33.33%;
  }
`;

export default ProjectCard;
