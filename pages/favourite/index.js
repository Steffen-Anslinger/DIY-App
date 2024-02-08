import Projects from "@/components/Projects";
import InfoBanner from "@/components/Design/StyledBanner";

export default function FavouritePage({
  projects,
  favourites,
  onToggleFavourite,
}) {
  const justFavourites = projects.filter((project) =>
    favourites.find(
      (favourite) => favourite.id === project._id && favourite.isFavourite
    )
  );

  return (
    <>
      <h2>Favourite Page</h2>
      <Projects
        projects={justFavourites}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
      {!justFavourites.length ? (
        <InfoBanner>No favourites selected.</InfoBanner>
      ) : (
        ""
      )}
    </>
  );
}
