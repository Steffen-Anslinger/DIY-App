import { useRouter } from "next/router";
import ProjectDetails from "@/components/ProjectDetails";
export default function DetailPage({ projects }) {
  const router = useRouter();
  const { slug } = router.query;
  return <ProjectDetails projects={projects} slug={slug} />;
}
