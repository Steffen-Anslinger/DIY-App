import React from "react";
import styled from "styled-components";
import color from "../Layout/Colors";
import StyledButton from "../Layout/Styled Buttons";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.grey[50]};
  padding-top: 30px;
  gap: 10px;
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
