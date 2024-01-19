import Fuse from "fuse.js";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  padding-top: 20px;
`;

export default function SearchBar(projects) {
  const fuse = new Fuse(projects, {
    keys: ["title", "slug"],
  });

  return (
    <StyledSearchBar>
      <input type="search" placeholder="Search"></input>
    </StyledSearchBar>
  );
}
