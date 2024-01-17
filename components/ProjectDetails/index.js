import Image from "next/image";
import StyledLink from "../Layout/StyledLinkButton";

export default function ProjectDetails({ projects, slug }) {
  const result = projects.filter((project) => project.slug === slug);

  if (result.length === 0) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <h2>Detail Page</h2>
      <h3>{result[0].title}</h3>
      <Image
        src={result[0].image}
        height={200}
        width={400}
        alt={result[0].title}
      />
      <p>{result[0].description}</p>

      <strong>Duration:</strong>
      {result[0].duration}
      <strong> Difficulty:</strong>
      {result[0].difficulty}

      {result[0].material && (
        <ul>
          <h3>Material</h3>
          {result[0].material.map((material, index) => (
            <li key={index}>
              {material.amount} {material.material}
            </li>
          ))}
        </ul>
      )}

      {result[0].instructions && (
        <ul>
          <h3>Instructions</h3>
          {result[0].instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      )}
      <StyledLink href="/">Back</StyledLink>
    </>
  );
}
