import styled from "styled-components";
import color from "../../utils/Colors";
import Image from "next/image";
import LoginButton from "../LoginButton";

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  background-color: ${color.grey[50]};
`;

const StyledHeader = styled(Image)`
  margin: 0;
  margin-left: auto;
  margin-right: auto;
`;

export default function Header() {
  return (
    <StyledHeaderContainer>
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
