import { useState } from "react";
import Fuse from "fuse.js";
import SearchBar from "@/components/SearchBar";
import Projects from "@/components/Projects";
import FilterBar from "@/components/Filterbar";

export default function HomePage({ projects, favourites, onToggleFavourite }) {
  const [searchPattern, setSearchPattern] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  const fuseOptions = {
    keys: ["title", "difficulty", "duration"],
  };
  const fuse = new Fuse(projects, fuseOptions);

  const searchProjects = searchPattern
    ? fuse.search(searchPattern).map((result) => result.item)
    : projects;

  const filterProjects = projects.filter((project) => {
    const difficultyMatch =
      !difficultyFilter || project.difficulty === difficultyFilter;
    const durationMatch =
      !durationFilter || project.duration === durationFilter;
    return difficultyMatch && durationMatch;
  });

  const combinedFilters = (searchPattern ? searchProjects : projects).filter(
    (project) => filterProjects.includes(project)
  );

  const handleSearchChange = (event) => {
    setSearchPattern(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficultyFilter(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationFilter(event.target.value);
  };

  return (
    <>
      <SearchBar
        searchPattern={searchPattern}
        onSearchChange={handleSearchChange}
        projects={projects}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
      <FilterBar
        difficultyFilter={difficultyFilter}
        durationFilter={durationFilter}
        onDifficultyChange={handleDifficultyChange}
        onDurationChange={handleDurationChange}
        setDifficultyFilter={setDifficultyFilter}
        setDurationFilter={setDurationFilter}
        onApplyFilters={() => {}}
      />
      <Projects
        projects={combinedFilters}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
    </>
  );
}
