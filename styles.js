import { createGlobalStyle } from "styled-components";
import themes from "./components/Design/Theme";
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${roboto.style.fontFamily}; 
    background-color: ${(props) => themes[props.theme].backgroundColor};
    color: ${(props) => themes[props.theme].fontColor};
  }

  textarea, input, select {
    font-family: ${roboto.style.fontFamily}; 
  }
`;
