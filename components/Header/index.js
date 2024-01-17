import styled from "styled-components";

const Title = styled.h1`
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  width: 100%;
`;

export default function Header() {
  return (
    <header>
      <Title> Placeholder DIY-APP </Title>
    </header>
  );
}
