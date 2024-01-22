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

  return (
    <>
      <h2>Detail Page</h2>

      <Image src={project.image} height={200} width={400} alt={project.title} />
      {editMode ? (
        // Bearbeitungsmodus für jeden Abschnitt
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Image:
            <input {...register("image")} defaultValue={project.image} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}
      <FavouriteButton
        onToggleFavourite={onToggleFavourite}
        id={project._id}
        favourites={favourites}
        isFavourite={isFavourite}
      />

      {
        editMode ? (
          // Bearbeitungsmodus für jeden Abschnitt
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Title:
              <input {...register("title")} defaultValue={project.title} />
            </label>
            <button type="submit">Save</button>
          </form>
        ) : null
        // Wenn nicht im Bearbeitungsmodus, zeige den "Edit"-Button direkt über dem Titel
      }

      <p>{project.description}</p>

      {editMode ? (
        // Bearbeitungsmodus für jeden Abschnitt
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Description:
            <textarea
              {...register("description")}
              defaultValue={project.description}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}

      <strong>Duration:</strong>
      {project.duration}

      {editMode ? (
        // Bearbeitungsmodus für jeden Abschnitt
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Duration:
            <input {...register("duration")} defaultValue={project.duration} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}

      <strong> Difficulty:</strong>
      {project.difficulty}

      {editMode ? (
        // Bearbeitungsmodus für jeden Abschnitt
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Difficulty:
            <input
              {...register("difficulty")}
              defaultValue={project.difficulty}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}

      {project.material && (
        <>
          {editMode ? (
            // Bearbeitungsmodus für jeden Abschnitt
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Material</h3>
              {project.material.map((material, index) => (
                <div key={index}>
                  <label>
                    Amount:
                    <input
                      {...register(`material[${index}].amount`)}
                      defaultValue={material.amount}
                    />
                  </label>
                  <label>
                    Material:
                    <input
                      {...register(`material[${index}].material`)}
                      defaultValue={material.material}
                    />
                  </label>
                </div>
              ))}
              <button type="submit">Save</button>
            </form>
          ) : (
            // Wenn nicht im Bearbeitungsmodus, zeige Material direkt an
            <ul>
              <h3>Material</h3>
              {project.material.map((material, index) => (
                <li key={index}>
                  {material.amount} {material.material}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <h3>Instructions</h3>
      <p>{project.instructions}</p>
      {editMode ? (
        // Bearbeitungsmodus für jeden Abschnitt
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Instructions</h3>
          <label>
            Instructions:
            <textarea
              {...register("instructions")}
              defaultValue={project.instructions}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}

      <StyledLink href="/">Back</StyledLink>
      <button onClick={() => setEditMode(true)}>Edit</button>
    </>
  );
}
