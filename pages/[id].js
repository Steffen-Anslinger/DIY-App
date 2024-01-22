import ProjectDetails from "@/components/ProjectDetails";
import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Navigation from "@/components/Navigation";

export default function ProductDetailsPage({ favourites, onToggleFavourite }) {
  return (
    <>
      <Header />
      <StyledSection>
        <ProjectDetails
          onToggleFavourite={onToggleFavourite}
          favourites={favourites}
        />
      </StyledSection>
      <Navigation />
    </>
  );
}
