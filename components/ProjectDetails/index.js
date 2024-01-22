import React, { useState } from "react";
import Image from "next/image";
import StyledLink from "../Layout/StyledLinkButton";
import FavouriteButton from "../FavouriteButton";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProjectDetails({
  isFavourite,
  onToggleFavourite,
  favourites,
}) {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, isLoading, mutate } = useSWR(`/api/projects/${id}`);
  const { register, handleSubmit } = useForm();

  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (formData) => {
    console.log(formData);
    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate();

      // Aktualisiere das Projekt-Objekt mit den neuen Daten
      project.title = formData.title;

      // Beende den Bearbeitungsmodus
      setEditMode(false);

      // Rufe mutate auf, um die Daten neu abzurufen und die Ansicht zu aktualisieren
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <>
      <h2>Detail Page</h2>

      {editMode ? (
        // Hier renderst du die Eingabefelder im Bearbeitungsmodus
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title:
            <input {...register("title")} defaultValue={project.title} />
          </label>
          {/* Weitere Eingabefelder können hier hinzugefügt werden */}
          <button type="submit">Save</button>
        </form>
      ) : (
        // Wenn du nicht im Edit-Modus bist, zeige den "Edit"-Button direkt über dem Titel
        <>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <h3>{project.title}</h3>
        </>
      )}

      <Image src={project.image} height={200} width={400} alt={project.title} />
      <FavouriteButton
        onToggleFavourite={onToggleFavourite}
        id={project._id}
        favourites={favourites}
        isFavourite={isFavourite}
      />
      <p>{project.description}</p>

      <strong>Duration:</strong>
      {project.duration}
      <strong> Difficulty:</strong>
      {project.difficulty}

      {project.material && (
        <ul>
          <h3>Material</h3>
          {project.material.map((material) => (
            <li key={material.material}>
              {material.amount} {material.material}
            </li>
          ))}
        </ul>
      )}

      <h3>Instructions</h3>
      <p>{project.instructions}</p>
      <StyledLink href="/">Back</StyledLink>
    </>
  );
}
