import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: black;

  &:hover {
    text-decoration: underline red;
    background-color: lightgray;
  }
`;

const StyledNav = styled.nav`
  align-items: center;
  border: solid 2px black;
  background-color: lightgray;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  justify-content: space-around;
`;

export default function Navigation() {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <StyledLink href="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink href="/create">Create</StyledLink>
        </li>
      </StyledList>
    </StyledNav>
  );
}
