import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import styled from "styled-components";
import Projects from "@/components/Projects"; // Import your Projects component

const StyledSearchBar = styled.div`
  padding-top: 20px;
`;

export default function SearchBar({ projects, favourites, onToggleFavourite }) {
  const [searchPattern, setSearchPattern] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fuseOptions = {
      keys: ["title"],
    };
    const fuse = new Fuse(projects, fuseOptions);
    if (searchPattern.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const results = fuse.search(searchPattern);
      const filtered = results.map((result) => result.item);
      setFilteredProjects(filtered);
    }
  }, [searchPattern, projects]);

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
