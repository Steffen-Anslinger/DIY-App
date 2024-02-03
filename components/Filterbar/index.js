import React from "react";
import styled from "styled-components";
import Image from "next/image";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledButton from "../Layout/Styled Buttons";
import color from "../Layout/Colors";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  margin-top: 10px;
  gap: 10px;
  background-color: ${color.grey[100]};
  border-radius: 5px;
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
          <label>Difficulty:</label>
          <StyledSelect value={difficultyFilter} onChange={onDifficultyChange}>
            <option value="">select...</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </StyledSelect>
          <StyledButton type="icon-red" onClick={handleDifficultyReset}>
            <Image
              src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Reset difficulty button"
              width={15}
              height={15}
            />
          </StyledButton>
          <label>Duration:</label>
          <StyledSelect value={durationFilter} onChange={onDurationChange}>
            <option value="">select...</option>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </StyledSelect>
          <StyledButton type="icon-red" onClick={handleDurationReset}>
            <Image
              src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Reset duration button"
              width={15}
              height={15}
            />
          </StyledButton>
          <StyledButton type="grey" onClick={handleFilterReset}>
            Reset
          </StyledButton>
        </StyledFilter>
      ) : null}
    </>
  );
}
