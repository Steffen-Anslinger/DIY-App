import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";
import StyledSection from "@/components/Layout/StyledSection";

export default function HomePage({ projects, favourites, onToggleFavourite }) {
  return (
    <>
      <Header />
      <StyledSection>
        <Projects
          projects={projects}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />
      </StyledSection>
      <Navigation />
    </>
  );
}
