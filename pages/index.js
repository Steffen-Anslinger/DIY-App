import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";
import StyledSection from "@/components/Layout/StyledSection";
import SearchBar from "@/components/SearchBar";

export default function HomePage({ projects, favourites, onToggleFavourite }) {
  return (
    <>
      <Header />
      <StyledSection>
        <SearchBar
          projects={projects}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />
      </StyledSection>
      <Navigation />
    </>
  );
}
