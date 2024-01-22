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

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Image:
            <input {...register("image")} defaultValue={project.image} />
          </label>
        </form>
      ) : (
        <>
          <Image
            src={project.image}
            height={200}
            width={400}
            alt={project.title}
          />

          <FavouriteButton
            onToggleFavourite={onToggleFavourite}
            id={project._id}
            favourites={favourites}
            isFavourite={isFavourite}
          />
        </>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title:
            <input {...register("title")} defaultValue={project.title} />
          </label>
        </form>
      ) : (
        <h3>{project.title}</h3>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Description:
            <textarea
              {...register("description")}
              defaultValue={project.description}
            />
          </label>
        </form>
      ) : (
        <p>{project.description}</p>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Duration:
            <select {...register("duration")} defaultValue={project.duration}>
              <option value="select...">select...</option>
              <option value="short">short</option>
              <option value="medium">medium</option>
              <option value="long">long</option>
            </select>
          </label>
        </form>
      ) : (
        <>
          <strong>Duration:</strong>
          {project.duration}
        </>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Difficulty:
            <select
              {...register("difficulty")}
              defaultValue={project.difficulty}
            >
              <option value="select...">select...</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </label>
        </form>
      ) : (
        <>
          <strong> Difficulty:</strong>
          {project.difficulty}
        </>
      )}

      {project.material && (
        <>
          {editMode ? (
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
            </form>
          ) : (
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

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Instructions</h3>
          <label>
            Instructions:
            <textarea
              {...register("instructions")}
              defaultValue={project.instructions}
            />
          </label>
        </form>
      ) : (
        <>
          <h3>Instructions</h3>
          <p>{project.instructions}</p>
        </>
      )}

      {editMode ? (
        <button onClick={() => setEditMode(false)}>Cancel</button>
      ) : (
        <StyledLink href="/">Back</StyledLink>
      )}
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Save</button>
        </form>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
    </>
  );
}
