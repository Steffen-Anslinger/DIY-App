import Link from "next/link";
import styled from "styled-components";
import color from "../../utils/Colors";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HomeSVG from "@/components/Design/SVGs/HomeIcon";
import themes from "../Design/Theme";

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
  background-color: ${(props) => themes[props.theme].navigationColor};
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
  background-color: ${(props) => themes[props.theme].navigationColor};
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export default function Navigation({ theme }) {
  const pathname = usePathname();
  return (
    <StyledNav theme={theme}>
      <StyledList>
        <StyledLinkNav theme={theme}>
          <StyledLink className={pathname == "/" ? "active" : ""} href="/">
            <HomeSVG />
          </StyledLink>
        </StyledLinkNav>

        <StyledLinkNav theme={theme}>
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

        <StyledLinkNav theme={theme}>
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
        <StyledLinkNav theme={theme}>
          <StyledLink
            className={pathname == "/profile" ? "active" : ""}
            href="/profile"
          >
            <Image
              src={"/assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="profile button"
              width={35}
              height={35}
            />
          </StyledLink>
        </StyledLinkNav>
      </StyledList>
    </StyledNav>
  );
}
