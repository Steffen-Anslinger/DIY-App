import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Projects from "@/components/Projects";

export default function FavouritePage({
  projects,
  favourites,
  onToggleFavourite,
}) {
  const justFavourites = projects.filter((project) =>
    favourites.find(
      (favourite) => favourite.slug === project.slug && favourite.isFavourite
    )
  );

  return (
    <>
      <Header />
      <StyledSection>
        <h2>Favourite Page</h2>
        <Projects
          projects={justFavourites}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />
        {!justFavourites.length ? <p>No favourites selected.</p> : ""}
      </StyledSection>
      <Navigation />
    </>
  );
}
