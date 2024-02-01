import React from "react";
import styled from "styled-components";

const StyledFilter = styled.div`
  position: fixed;
  right: 0;
  border: solid 1px black;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 8px;
  padding-top: 150px;
`;

export default function FilterBar({
  difficultyFilter,
  durationFilter,
  onDifficultyChange,
  onDurationChange,
  setDurationFilter,
  setDifficultyFilter,
}) {
  const handleFilterReset = () => {
    setDifficultyFilter("");
    setDurationFilter("");
  };

  const handleDurationReset = () => {
    setDurationFilter("");
  };

  const handleDifficultyReset = () => {
    setDifficultyFilter("");
  };

  return (
    <StyledFilter>
      <label>
        Difficulty:
        <select value={difficultyFilter} onChange={onDifficultyChange}>
          <option value="">select...</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button onClick={handleDifficultyReset}>Reset Difficulty</button>
      </label>
      <label>
        Duration:
        <select value={durationFilter} onChange={onDurationChange}>
          <option value="">select...</option>
          <option value="short">short</option>
          <option value="medium">medium</option>
          <option value="long">long</option>
        </select>
        <button onClick={handleDurationReset}>Reset Duration</button>
      </label>
      <button onClick={handleFilterReset}>Reset Filters</button>
    </StyledFilter>
  );
}
