import Image from "next/image";
import Link from "next/link";

export default function ProjectDetails({ projects, slug }) {
  const result = projects.filter((project) => project.slug === slug);

  // Check if the result array is empty
  if (result.length === 0) {
    // Handle the case where no matching project is found, for example, redirect to a 404 page.
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
      <div>
        {result[0].duration} {result[0].difficulty}
      </div>

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
      <Link href="/">Back</Link>
    </>
  );
}
