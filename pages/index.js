import Projects from "@/components/Projects";
import SearchBar from "@/components/SearchBar";
import Fuse from "fuse.js";
import React, { useState } from "react";

export default function HomePage({ projects, favourites, onToggleFavourite }) {
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
    <>
      <SearchBar
        searchPattern={searchPattern}
        onChange={handleSearchChange}
        projects={projects}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
      <Projects
        projects={searchPattern ? filteredProjects : projects}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
    </>
  );
}
