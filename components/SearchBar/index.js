import React from "react";
import styled from "styled-components";
import color from "../Layout/Colors";
import StyledButton from "../Layout/Styled Buttons";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.grey[50]};
  padding-top: 40px;
  gap: 10px;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 35.5px;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  background-color: ${color.grey[100]};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
  &:focus {
    border: solid 2px ${color.orange[600]};
  }
`;

export default function SearchBar({
  searchPattern,
  onSearchChange,
  setFilterMode,
}) {
  const toggleFilterMode = () => {
    setFilterMode((currentMode) => !currentMode);
  };

  return (
    <>
      <StyledSearchBar>
        <StyledSearchInput
          type="search"
          placeholder="Search"
          value={searchPattern}
          onChange={onSearchChange}
        />
        <StyledButton type="blue" onClick={toggleFilterMode}>
          Filter
        </StyledButton>
      </StyledSearchBar>
    </>
  );
}
