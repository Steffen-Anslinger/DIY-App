import Projects from "@/components/Projects";

export default function DetailPage({
  projects,
  favourites,
  onToggleFavourite,
}) {
  return (
    <Projects
      projects={projects}
      favourites={favourites}
      onToggleFavourite={onToggleFavourite}
    />
  );
}
