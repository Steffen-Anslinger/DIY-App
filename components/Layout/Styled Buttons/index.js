import styled, { css } from "styled-components";
import color from "../Colors";

const baseButtonStyles = css`
  padding: 8px 16px;
  margin: 5px 0px;
  margin-right: 10px;
  border-radius: 0.375rem;
  font-weight: normal;
  color: #fff;
  cursor: pointer;
  border: none;
  font-size: small;
  transition: background-color 0.3s ease;
`;

const orangeButtonStyles = css`
  background-color: ${color.orange[500]};
  color: ${color.grey[50]};
  &:hover {
    background-color: ${color.orange[600]};
  }
`;

const blueButtonStyles = css`
  border: solid 2px ${color.orange[600]};
  color: ${color.orange[600]};
  font-weight: bold;
  &:hover {
    background-color: ${color.orange[600]};
    color: ${color.grey[50]};
  }
`;

const redButtonStyles = css`
  background-color: ${color.red[500]};
  color: ${color.red[50]};
  &:hover {
    background-color: ${color.red[600]};
  }
`;

const greyButtonStyles = css`
  background-color: ${color.grey[900]};
  color: ${color.red[50]};
  &:hover {
    background-color: ${color.grey[950]};
  }
`;

const whiteButtonStyles = css`
  background-color: ${color.grey[100]};
  color: ${color.grey[950]};
  &:hover {
    background-color: ${color.grey[200]};
  }
`;

const iconredButtonStyles = css`
  background-color: ${color.red[200]};
  color: ${color.grey[950]};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${color.red[300]};
  }
`;

const iconblueButtonStyles = css`
  background-color: ${color.grey[200]};
  color: ${color.grey[950]};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${color.blue[300]};
  }
`;

const StyledButton = styled.button`
  ${baseButtonStyles}

  ${(props) =>
    props.type === "orange" &&
    css`
      ${orangeButtonStyles}
    `}

  ${(props) =>
    props.type === "blue" &&
    css`
      ${blueButtonStyles}
    `}

  ${(props) =>
    props.type === "red" &&
    css`
      ${redButtonStyles}
    `}

  ${(props) =>
    props.type === "grey" &&
    css`
      ${greyButtonStyles}
    `}

  ${(props) =>
    props.type === "white" &&
    css`
      ${whiteButtonStyles}
    `}

  ${(props) =>
    props.type === "icon-red" &&
    css`
      ${iconredButtonStyles}
    `}
  
    ${(props) =>
    props.type === "icon-blue" &&
    css`
      ${iconblueButtonStyles}
    `}
`;

export default StyledButton;
