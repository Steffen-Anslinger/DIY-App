import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  margin-left: calc(8px);
  margin-right: calc(8px);
  margin-top: calc(50px);
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
`;

export default function SearchBar({ searchPattern, onChange }) {
  return (
    <StyledSearchBar>
      <StyledSearchInput
        type="search"
        placeholder="Search"
        value={searchPattern}
        onChange={onChange}
      />
    </StyledSearchBar>
  );
}
