import styled from "styled-components";

const Title = styled.h1`
  margin: 0;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
`;

export default function Header() {
  return (
    <header>
      <Title> Placeholder DIY-APP </Title>
    </header>
  );
}
