import React, { useState } from "react";
import Fuse from "fuse.js";
import styled from "styled-components";
import Projects from "@/components/Projects";

const StyledSearchBar = styled.div`
  padding-top: 20px;
`;

export default function SearchBar({ projects, favourites, onToggleFavourite }) {
  const [searchPattern, setSearchPattern] = useState("");

  const fuseOptions = {
    keys: ["title"],
  };
  const fuse = new Fuse(projects, fuseOptions);
  const filteredProjects = fuse
    .search(searchPattern)
    .map((result) => result.item);

  const handleSearchChange = (event) => {
    setSearchPattern(event.target.value);
  };

  return (
    <StyledSearchBar>
      <input
        type="search"
        placeholder="Search"
        value={searchPattern}
        onChange={handleSearchChange}
      />
      <Projects
        projects={searchPattern ? filteredProjects : projects}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
    </StyledSearchBar>
  );
}
