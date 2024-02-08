import styled from "styled-components";
import Image from "next/image";
import LoginButton from "../LoginButton";
import themes from "../Design/Theme";
import StyledButton from "../Design/StyledButtons";
import HeaderSVG from "../Design/SVGs/CRAFTIFY";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  background-color: ${(props) => themes[props.theme].backgroundColor};
  padding-left: 10px;
`;

const StyledHeader = styled.div`
  margin: 0;
  margin-left: auto;
  margin-right: auto;
`;

export default function Header({ theme, toggleDarkMode }) {
  return (
    <StyledHeaderContainer theme={theme}>
      <StyledButton type="button" name="icon-blue" onClick={toggleDarkMode}>
        <Image
          src="/assets/brightness_6_FILL0_wght400_GRAD0_opsz24.svg"
          width={25}
          height={25}
          alt="dark mode toggle button"
        />
      </StyledButton>
      <StyledHeader>
        <HeaderSVG theme={theme} />
      </StyledHeader>
      <LoginButton />
    </StyledHeaderContainer>
  );
}
