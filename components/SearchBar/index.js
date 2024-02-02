import React from "react";
import styled from "styled-components";
import color from "../Layout/Colors";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.grey[50]};
  padding: 8px 0px;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  margin-left: calc(8px);
  margin-right: calc(8px);
  margin-top: calc(50px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleFilterButton = styled.button`
  border: none;
  height: fit-content;
  width: fit-content;
  border-radius: 5px;
  margin-top: 50px;
  padding: 5px;
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
        <ToggleFilterButton onClick={toggleFilterMode}>
          Filter
        </ToggleFilterButton>
      </StyledSearchBar>
    </>
  );
}
