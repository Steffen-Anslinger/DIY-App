import React from "react";
import ProjectDetails from "../ProjectDetails";
import EditForm from "../EditForm";
import StyledLink from "../Layout/StyledLinkButton";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DetailsPage({
  isFavourite,
  onToggleFavourite,
  favourites,
}) {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data: project, isLoading, mutate } = useSWR(`/api/projects/${id}`);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setEditMode(false);
      mutate();
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  async function handleDeleteProject() {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const response = await fetch("/api/projects");
      mutate("/api/projects", response.json());
      router.push("/");
    }
  }

  return (
    <>
      <h2>Detail Page</h2>

      {editMode ? (
        <>
          <EditForm
            project={project}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
          />{" "}
          <button onClick={() => setEditMode(false)}>Cancel</button>
          <button onClick={handleSubmit(onSubmit)} type="submit">
            Save
          </button>
        </>
      ) : (
        <>
          <ProjectDetails
            project={project}
            onToggleFavourite={onToggleFavourite}
            isFavourite={isFavourite}
            favourites={favourites}
          />
          <StyledLink href="/">Back</StyledLink>
          <button onClick={() => setEditMode(true)}>Edit</button>

          <button type="button" onClick={handleSubmit(handleDeleteProject)}>
            ❌ Delete
          </button>
        </>
      )}
    </>
  );
}
