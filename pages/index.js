import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Link from "next/link";
import styled from "styled-components";


const StyledLink = styled(Link)`
background-color: lightgray;
color: black;
padding: 1em 1.5em;
text-decoration: none;
border-radius: 5px;
`

export default function HomePage({ projects }) {
  return (
    <div>
      <Header />
      <Projects projects={projects} />
      <StyledLink href="/create">Create new project</StyledLink>
    </div>
  );
}
