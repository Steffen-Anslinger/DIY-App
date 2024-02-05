import React from "react";
import styled from "styled-components";
import Image from "next/image";

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingAnimation = () => {
  return (
    <CenteredContainer>
      <Image
        src={"/assets/wired-outline-1754-nails-screw-carpentry (3).gif"}
        alt="Create button"
        width={250}
        height={250}
      />
    </CenteredContainer>
  );
};

export default LoadingAnimation;
