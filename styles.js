import { createGlobalStyle } from "styled-components";
import color from "./utils/Colors";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: ${color.grey[50]};
  }
`;
