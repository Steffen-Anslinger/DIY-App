import React from "react";
import ProjectDetails from "../ProjectDetails";
import EditForm from "../EditForm";
import StyledLink from "../Layout/StyledLinkButton";
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function EditDetails({
  isFavourite,
  onToggleFavourite,
  favourites,
  project,
}) {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  async function handleDeleteProject() {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });

      const response = await fetch("/api/projects");
      if (response.ok) {
        mutate("/api/projects");
        router.push("/");
      }
      if (!response.ok) {
        response.status(404).json({ status: "Could not be deleted" });
      }
    }
  }

  return (
    <>
      {editMode ? (
        <EditForm
          project={project}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <h2>Detail Page</h2>
          <ProjectDetails
            project={project}
            onToggleFavourite={onToggleFavourite}
            isFavourite={isFavourite}
            favourites={favourites}
          />
          <StyledLink href="/">Back</StyledLink>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button type="button" onClick={handleDeleteProject}>
            ❌ Delete
          </button>
        </>
      )}
    </>
  );
}
