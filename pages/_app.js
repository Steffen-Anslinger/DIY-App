import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function handleToggleFavourite(id, event) {
    event.preventDefault();
    const favourite = favourites.find((favourite) => favourite.id === id);
    if (favourite) {
      setFavourites(
        favourites.map((favourite) =>
          favourite.id === id
            ? { id, isFavourite: !favourite.isFavourite }
            : favourite
        )
      );
    } else {
      setFavourites([...favourites, { id, isFavourite: true }]);
    }
  }

  const { data: projects, isLoading } = useSWR("/api/projects", fetcher);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!projects) {
    return;
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component
          {...pageProps}
          projects={projects}
          onToggleFavourite={handleToggleFavourite}
          favourites={favourites}
        />
      </SWRConfig>
    </>
  );
}
