import { createGlobalStyle } from "styled-components";
import color from "./components/Layout/Colors";

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
