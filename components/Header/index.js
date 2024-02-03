import styled from "styled-components";
import color from "../Layout/Colors";
import Image from "next/image";

const StyledHeader = styled(Image)`
  margin: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  padding-top: 10px;
  background-color: ${color.grey[50]};
`;

export default function Header() {
  return (
    <StyledHeader
      src={"/assets/CRAFTIFY.svg"}
      width={100}
      height={50}
      alt="Craftify Logo"
    ></StyledHeader>
  );
}
