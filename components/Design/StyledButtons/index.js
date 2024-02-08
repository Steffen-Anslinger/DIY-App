import styled, { css } from "styled-components";
import color from "../../../utils/Colors";

const baseButtonStyles = css`
  padding: 8px 16px;
  margin: 5px 10px 3px 0px;
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

const oulineButtonStyles = css`
  border: solid 2px ${color.orange[600]};
  color: ${color.orange[600]};
  font-weight: bold;
  &:hover {
    background-color: ${color.orange[600]};
    color: ${color.grey[50]};
  }
`;

const greyButtonStyles = css`
  background-color: ${color.grey[900]};
  color: ${color.red[50]};
  &:hover {
    background-color: ${color.orange[600]};
  }
`;

const iconredButtonStyles = css`
  background-color: ${color.red[200]};
  color: ${color.grey[950]};
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${color.red[300]};
  }
  &:disabled {
    display: none;
  }
`;

const iconblueButtonStyles = css`
  background-color: ${color.grey[200]};
  color: ${color.grey[950]};
  width: fit-content;
  height: fit-content;
  padding: 5px;
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
    props.name === "orange" &&
    css`
      ${orangeButtonStyles}
    `}

  ${(props) =>
    props.name === "outline" &&
    css`
      ${oulineButtonStyles}
    `}



  ${(props) =>
    props.name === "grey" &&
    css`
      ${greyButtonStyles}
    `}


  ${(props) =>
    props.name === "icon-red" &&
    css`
      ${iconredButtonStyles}
    `}
  
    ${(props) =>
    props.name === "icon-blue" &&
    css`
      ${iconblueButtonStyles}
    `}
`;

export default StyledButton;
