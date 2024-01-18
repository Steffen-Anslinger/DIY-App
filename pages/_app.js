import GlobalStyle from "../styles";
import { initialProjects } from "@/lib/data";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [projects, setProjects] = useLocalStorageState("projects", {
    defaultValue: initialProjects,
  });

  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function handleToggleFavourite(slug, event) {
    event.preventDefault();
    const favourite = favourites.find((favourite) => favourite.slug === slug);
    if (favourite) {
      setFavourites(
        favourites.map((favourite) =>
          favourite.slug === slug
            ? { slug, isFavourite: !favourite.isFavourite }
            : favourite
        )
      );
    } else {
      setFavourites([...favourites, { slug, isFavourite: true }]);
    }
  }

  function handleAddEntry(newEntry) {
    setProjects([...projects, { ...newEntry }]);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        onAddProject={handleAddEntry}
        projects={projects}
        onToggleFavourite={handleToggleFavourite}
        favourites={favourites}
      />
    </>
  );
}
