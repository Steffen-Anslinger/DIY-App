import styled from "styled-components";
import color from "../Layout/Colors";

const Title = styled.h1`
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: ${color.orange[600]};
  color: ${color.grey[950]};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  padding: 10px 0;
`;

export default function Header() {
  return (
    <header>
      <Title> Craftify </Title>
    </header>
  );
}
