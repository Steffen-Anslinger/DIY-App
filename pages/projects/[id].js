import EditDetails from "@/components/EditDetails";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingAnimation from "@/components/Design/LoadingAnimation";

export default function ProjectDetailsPage({
  theme,
  favourites,
  onToggleFavourite,
}) {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, isLoading } = useSWR(`/api/projects/${id}`);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <EditDetails
      theme={theme}
      project={project}
      onToggleFavourite={onToggleFavourite}
      favourites={favourites}
    />
  );
}
