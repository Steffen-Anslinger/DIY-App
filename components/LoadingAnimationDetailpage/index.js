import React from "react";
import styled from "styled-components";
import Image from "next/image";

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingAnimationDetailpage = () => {
  return (
    <CenteredContainer>
      <Image
        src={"/assets/loading_animation_detailpage.gif"}
        alt="Create button"
        width={250}
        height={250}
      />
    </CenteredContainer>
  );
};

export default LoadingAnimationDetailpage;
