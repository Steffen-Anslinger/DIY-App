import Link from "next/link";
import styled from "styled-components";
import color from "../Layout/Colors";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  z-index: 2;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.08);
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
            <Image
              src={"/assets/home_app_logo_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Home button"
              width={35}
              height={35}
            />
          </StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink
            className={pathname == "/create" ? "active" : ""}
            href="/create"
          >
            <Image
              src={"/assets/add_circle_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Create button"
              width={35}
              height={35}
            />
          </StyledLink>
        </StyledLinkNav>
        <StyledLinkNav>
          <StyledLink
            className={pathname == "/favourite" ? "active" : ""}
            href="/favourite"
          >
            <Image
              src={"/assets/favorite_FILL1_wght400_GRAD0_opsz24 black.svg"}
              alt="Favourite button"
              width={35}
              height={35}
            />
          </StyledLink>
        </StyledLinkNav>
      </StyledList>
    </StyledNav>
  );
}
