import { createGlobalStyle } from "styled-components";
import color from "./utils/Colors";
import themes from "./components/Design/Theme";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: ${(props) => themes[props.theme].headerBackgroundColor};
    color: ${(props) => themes[props.theme].fontColor};
  }
`;
