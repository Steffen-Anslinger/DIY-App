import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  padding-top: 20px;
`;

export default function SearchBar({ searchPattern, onChange }) {
  return (
    <StyledSearchBar>
      <input
        type="search"
        placeholder="Search"
        value={searchPattern}
        onChange={onChange}
      />
    </StyledSearchBar>
  );
}
