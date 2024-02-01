import React from "react";
import styled, { keyframes } from "styled-components";
import color from "../Colors";

const ldsRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
`;

const LdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const LdsRingDiv = styled.div`
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid ${(props) => props.color || `${color.orange[600]}`};
  border-radius: 50%;
  animation: ${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${(props) => props.color || `${color.orange[600]}`} transparent
    transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const LoadingAnimation = ({ color }) => {
  return (
    <CenteredContainer>
      <LdsRing>
        <LdsRingDiv color={color} />
      </LdsRing>
    </CenteredContainer>
  );
};

export default LoadingAnimation;
