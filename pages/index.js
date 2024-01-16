import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Link from "next/link";

export default function HomePage({ projects }) {
  return (
    <div>
      <Header />
      <Projects projects={projects} />
      <Link href="/create">
        <button>Create new project</button>
      </Link>
    </div>
  );
}
