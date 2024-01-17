import Image from "next/image";
import Link from "next/link";
export default function ProjectDetails({ projects, slug }) {
  console.log("hallo");
  const result = projects.filter((project) => project.slug === slug);
  console.log("hallo");
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

      <ul>
        <li>{result[0].instructions}</li>
      </ul>
      <Link href="/">Back</Link>
    </>
  );
}
