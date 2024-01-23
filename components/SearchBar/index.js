import React, { useState } from "react";
import Fuse from "fuse.js";
import styled from "styled-components";
import Projects from "@/components/Projects";

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
