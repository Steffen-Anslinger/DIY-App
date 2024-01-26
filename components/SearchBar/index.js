import React from "react";
import styled from "styled-components";
import color from "../Layout/Colors";

const StyledSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  background-color: ${color.grey[50]};
  padding: 8px;
  padding-top: 20px;
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
