import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";

export default function HomePage({ projects, favourites, onToggleFavourite }) {
  return (
    <>
      <Header />
      <Projects
        projects={projects}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
      />
      <Navigation />
    </>
  );
}
