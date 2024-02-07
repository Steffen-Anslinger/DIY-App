import { useState } from "react";
import Fuse from "fuse.js";
import SearchBar from "@/components/SearchBar";
import Projects from "@/components/Projects";
import FilterBar from "@/components/Filterbar";
import styled from "styled-components";
import color from "@/utils/Colors";
import InfoSVG from "@/components/Design/SVGs/InfoIcon";
import themes from "@/components/Design/Theme";

const StyledInfo = styled.div`
  margin: 10px 0px;
  padding: 5px;
  padding-left: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${color.blue[950]};
  background-color: ${color.blue[50]};
  align-items: center;
  display: flex;
  gap: 10px;
`;

const StyledSearchWrapper = styled.div`
  position: sticky;
  top: 30px;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 8px;
  background-color: ${(props) => themes[props.theme].backgroundColor};
`;

export default function HomePage({
  projects,
  favourites,
  onToggleFavourite,
  theme,
}) {
  const [searchPattern, setSearchPattern] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [filterMode, setFilterMode] = useState(false);

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

  const isSearchingOrFiltering =
    searchPattern.length > 0 ||
    difficultyFilter.length > 0 ||
    durationFilter.length > 0;

  const numberOfProjectsFound = isSearchingOrFiltering
    ? combinedFilters.length
    : 0;

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
      <StyledSearchWrapper theme={theme}>
        <SearchBar
          searchPattern={searchPattern}
          onSearchChange={handleSearchChange}
          projects={projects}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
        />
        <FilterBar
          difficultyFilter={difficultyFilter}
          durationFilter={durationFilter}
          onDifficultyChange={handleDifficultyChange}
          onDurationChange={handleDurationChange}
          setDifficultyFilter={setDifficultyFilter}
          setDurationFilter={setDurationFilter}
          onApplyFilters={() => {}}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          theme={theme}
        />
        <div>
          {isSearchingOrFiltering && numberOfProjectsFound === 0 && (
            <StyledInfo>
              <InfoSVG /> <p>No Projects found with the filter criteria.</p>
            </StyledInfo>
          )}
          {isSearchingOrFiltering && numberOfProjectsFound > 0 && (
            <StyledInfo>
              {`${numberOfProjectsFound} Projects found.`}
            </StyledInfo>
          )}
        </div>
      </StyledSearchWrapper>

      <Projects
        projects={combinedFilters}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
    </>
  );
}
