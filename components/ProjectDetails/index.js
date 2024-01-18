import Image from "next/image";
import StyledLink from "../Layout/StyledLinkButton";
import { v4 as uuidv4 } from "uuid";

export default function ProjectDetails({
  projects,
  slug,
  favourites,
  onToggleFavourite,
}) {
  const result = projects.find((project) => project.slug === slug);

  if (!result) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <h2>Detail Page</h2>
      <h3>{result.title}</h3>
      <Image src={result.image} height={200} width={400} alt={result.title} />
      <p>{result.description}</p>

      <strong>Duration:</strong>
      {result.duration}
      <strong> Difficulty:</strong>
      {result.difficulty}

      {result.material && (
        <ul>
          <h3>Material</h3>
          {result.material.map((material) => (
            <li key={uuidv4()}>
              {material.amount} {material.material}
            </li>
          ))}
        </ul>
      )}

      {result.instructions && (
        <ul>
          <h3>Instructions</h3>
          {result.instructions.map((step) => (
            <li key={uuidv4()}>{step}</li>
          ))}
        </ul>
      )}
      <StyledLink href="/">Back</StyledLink>
    </>
  );
}
