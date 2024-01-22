import Image from "next/image";
import StyledLink from "../Layout/StyledLinkButton";
import FavouriteButton from "../FavouriteButton";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function ProjectDetails({
  isFavourite,
  onToggleFavourite,
  favourites,
}) {
  const router = useRouter();
  const { id } = router.query;

  const { data: project, isLoading } = useSWR(`/api/projects/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!project) {
    return;
  }

  return (
    <>
      <h2>Detail Page</h2>
      <h3>{project.title}</h3>
      <Image src={project.image} height={200} width={400} alt={project.title} />
      <FavouriteButton
        onToggleFavourite={onToggleFavourite}
        id={project._id}
        favourites={favourites}
        isFavourite={isFavourite}
      />
      <p>{project.description}</p>

      <strong>Duration:</strong>
      {project.duration}
      <strong> Difficulty:</strong>
      {project.difficulty}

      {project.material && (
        <ul>
          <h3>Material</h3>
          {project.material.map((material) => (
            <li key={project._id}>
              {material.amount} {material.material}
            </li>
          ))}
        </ul>
      )}

      <h3>Instructions</h3>
      <p>{project.instructions}</p>
      <StyledLink href="/">Back</StyledLink>
    </>
  );
}
