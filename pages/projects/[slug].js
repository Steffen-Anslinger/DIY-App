import { useRouter } from "next/router";
import ProjectDetails from "@/components/ProjectDetails";
import Header from "@/components/Header";
import StyledSection from "@/components/Layout/StyledSection";
import Navigation from "@/components/Navigation";

export default function DetailPage({
  projects,
  favourites,
  onToggleFavourite,
}) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <Header />
      <StyledSection>
        <ProjectDetails
          projects={projects}
          slug={slug}
          favourites={favourites}
          onToggleFavourite={onToggleFavourite}
        />
      </StyledSection>
      <Navigation />
    </>
  );
}
