import styled from "styled-components";
import Image from "next/image";
import LoginButton from "../LoginButton";
import themes from "../Design/Theme";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  background-color: ${(props) => themes[props.theme].headerBackgroundColor};
`;

const StyledHeader = styled(Image)`
  margin: 0;
  margin-left: auto;
  margin-right: auto;
`;

export default function Header({ theme }) {
  return (
    <StyledHeaderContainer theme={theme}>
      <StyledHeader
        src={"/assets/CRAFTIFY.svg"}
        width={150}
        height={75}
        alt="Craftify Logo"
      />
      <LoginButton />
    </StyledHeaderContainer>
  );
}
