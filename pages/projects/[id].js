import EditDetails from "@/components/EditDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProjectDetailsPage({ favourites, onToggleFavourite }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, isLoading } = useSWR(`/api/projects/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <EditDetails
      project={project}
      onToggleFavourite={onToggleFavourite}
      favourites={favourites}
    />
  );
}
