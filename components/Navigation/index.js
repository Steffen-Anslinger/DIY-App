import Link from "next/link";
import styled from "styled-components";
import color from "../Layout/Colors";
import { usePathname } from "next/navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: ${color.grey[950]};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${color.orange[600]};
  }
  &.active {
    background-color: ${color.orange[600]};
  }
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
  cursor: pointer;
`;

export default function Navigation() {
  const pathname = usePathname();
  return (
    <StyledNav>
      <StyledList>
        <StyledLinkNav>
          <StyledLink className={pathname == "/" ? "active" : ""} href="/">
            Home
          </StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink
            className={pathname == "/create" ? "active" : ""}
            href="/create"
          >
            Create
          </StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink
            className={pathname == "/favourite" ? "active" : ""}
            href="/favourite"
          >
            Favourite
          </StyledLink>
        </StyledLinkNav>
      </StyledList>
    </StyledNav>
  );
}
