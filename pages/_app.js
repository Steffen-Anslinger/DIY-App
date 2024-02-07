import GlobalStyle from "@/styles";
import useLocalStorageState from "use-local-storage-state";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import StyledSection from "@/components/Design/StyledSection";
import LoadingAnimation from "@/components/Design/LoadingAnimation";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  let response, data;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  data = await response.json();
  return data;
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

  const [theme, setTheme] = useState("Theme Light");

  const toggleDarkMode = () => {
    setTheme((prevTheme) =>
      prevTheme === "Theme Light" ? "Theme Dark" : "Theme Light"
    );
  };
  const { data: projects, isLoading } = useSWR("/api/projects", fetcher);
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!projects) {
    return;
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <SWRConfig value={{ fetcher }}>
          <GlobalStyle theme={theme} />
          <Header theme={theme} toggleDarkMode={toggleDarkMode} />
          <StyledSection>
            <Component
              theme={theme}
              {...pageProps}
              projects={projects}
              onToggleFavourite={handleToggleFavourite}
              favourites={favourites}
            />
          </StyledSection>
          <Navigation theme={theme} />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
