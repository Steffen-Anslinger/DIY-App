import React from "react";
import styled from "styled-components";
import Image from "next/image";
import color from "@/utils/Colors";

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${color.grey[950]};
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
