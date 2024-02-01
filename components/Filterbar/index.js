import React from "react";
import styled from "styled-components";
import Image from "next/image";
import StyledSelect from "../Layout/FormStyles/StyledSelect";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 10px;
`;

const ResetButton = styled.button`
  display: flex;
  flex-wrap: nowrap;
  border: none;
  height: fit-content;
  width: fit-content;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
`;

const FilterLabel = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default function FilterBar({
  difficultyFilter,
  durationFilter,
  onDifficultyChange,
  onDurationChange,
  setDurationFilter,
  setDifficultyFilter,
  filterMode,
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
    <>
      {filterMode ? (
        <StyledFilter>
          <FilterLabel>
            Difficulty:
            <StyledSelect
              value={difficultyFilter}
              onChange={onDifficultyChange}
            >
              <option value="">select...</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </StyledSelect>
            <ResetButton onClick={handleDifficultyReset}>
              <Image
                src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                alt="Reset difficulty button"
                width={15}
                height={15}
              />
            </ResetButton>
          </FilterLabel>
          <FilterLabel>
            Duration:
            <StyledSelect value={durationFilter} onChange={onDurationChange}>
              <option value="">select...</option>
              <option value="short">short</option>
              <option value="medium">medium</option>
              <option value="long">long</option>
            </StyledSelect>
            <ResetButton onClick={handleDurationReset}>
              <Image
                src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                alt="Reset duration button"
                width={15}
                height={15}
              />
            </ResetButton>
          </FilterLabel>
          <ResetButton onClick={handleFilterReset}>Reset All</ResetButton>
        </StyledFilter>
      ) : null}
    </>
  );
}
