import React from "react";
import styled from "styled-components";
import color from "../../utils/Colors";
import StyledButton from "../Design/StyledButtons";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 45px;
  gap: 10px;
  backdrop-filter: blur(10px);
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 35.5px;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
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
        <StyledButton type="button" name="outline" onClick={toggleFilterMode}>
          Filter
        </StyledButton>
      </StyledSearchBar>
    </>
  );
}
