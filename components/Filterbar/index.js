import React from "react";
import styled from "styled-components";
import Image from "next/image";
import StyledSelect from "../Design/FormStyles/StyledSelect";
import StyledButton from "../Design/StyledButtons";
import color from "../../utils/Colors";
import StyledLabel from "../Design/FormStyles/StyledLabel";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 8px 20px;
  margin-top: 10px;
  gap: 10px;
  background-color: ${color.grey[100]};
  border-radius: 5px;
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
          <StyledLabel>
            Difficulty:
            <Wrapper>
              <StyledSelect
                value={difficultyFilter}
                onChange={onDifficultyChange}
              >
                <option value="">select...</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </StyledSelect>
              <StyledButton
                type="button"
                name="icon-blue"
                onClick={handleDifficultyReset}
              >
                X
              </StyledButton>
            </Wrapper>
          </StyledLabel>

          <StyledLabel>
            Duration:
            <Wrapper>
              <StyledSelect value={durationFilter} onChange={onDurationChange}>
                <option value="">select...</option>
                <option value="short">short</option>
                <option value="medium">medium</option>
                <option value="long">long</option>
              </StyledSelect>

              <StyledButton
                type="button"
                name="icon-blue"
                onClick={handleDurationReset}
              >
                X
              </StyledButton>
            </Wrapper>
          </StyledLabel>
          <StyledButton type="button" name="grey" onClick={handleFilterReset}>
            Reset
          </StyledButton>
        </StyledFilter>
      ) : null}
    </>
  );
}
