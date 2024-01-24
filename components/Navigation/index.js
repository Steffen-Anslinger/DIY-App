import Link from "next/link";
import styled from "styled-components";
import color from "../Layout/Colors";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: black;
`;

const StyledNav = styled.nav`
  background-color: ${color.grey[50]};
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 50px;
`;

const StyledLinkNav = styled.li`
  background-color: ${color.grey[50]};
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${color.orange[600]};
  }
`;

export default function Navigation() {
  return (
    <StyledNav>
      <StyledList>
        <StyledLinkNav>
          <StyledLink href="/">Home</StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink href="/create">Create</StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink href="/favourite">Favourite</StyledLink>
        </StyledLinkNav>
      </StyledList>
    </StyledNav>
  );
}
