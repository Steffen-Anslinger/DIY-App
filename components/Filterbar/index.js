import React from "react";
import styled from "styled-components";
import Image from "next/image";
import StyledSelect from "../Design/FormStyles/StyledSelect";
import StyledButton from "../Design/StyledButtons";
import StyledLabel from "../Design/FormStyles/StyledLabel";
import themes from "../Design/Theme";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 8px 20px;
  margin-top: 10px;
  gap: 10px;
  border-radius: 5px;
  background-color: ${(props) => themes[props.theme].DetailsBackgroundColor};
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
  theme,
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
        <StyledFilter theme={theme}>
          <StyledLabel htmlFor="difficulty">
            Difficulty:
            <Wrapper>
              <StyledSelect
                aria-label="choose difficulty"
                value={difficultyFilter}
                onChange={onDifficultyChange}
              >
                <option value="">select...</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </StyledSelect>
              <StyledButton
                aria-label="reset difficulty filter"
                type="button"
                name="icon-blue"
                onClick={handleDifficultyReset}
              >
                <Image
                  src={"/assets/close_FILL0_wght400_GRAD0_opsz24.svg"}
                  alt="Reset Button"
                  width={15}
                  height={15}
                />
              </StyledButton>
            </Wrapper>
          </StyledLabel>

          <StyledLabel aria-label="choose duration">
            Duration:
            <Wrapper>
              <StyledSelect
                aria-label="reset duration filter"
                value={durationFilter}
                onChange={onDurationChange}
              >
                <option value="">select...</option>
                <option value="short">short</option>
                <option value="medium">medium</option>
                <option value="long">long</option>
              </StyledSelect>

              <StyledButton
                aria-label="reset duration filter"
                type="button"
                name="icon-blue"
                onClick={handleDurationReset}
              >
                <Image
                  src={"/assets/close_FILL0_wght400_GRAD0_opsz24.svg"}
                  alt="Reset Button"
                  width={15}
                  height={15}
                />
              </StyledButton>
            </Wrapper>
          </StyledLabel>
          <StyledButton
            aria-label="reset all filters"
            type="button"
            name="orange"
            onClick={handleFilterReset}
          >
            Reset
          </StyledButton>
        </StyledFilter>
      ) : null}
    </>
  );
}
