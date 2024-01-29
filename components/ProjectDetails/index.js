import React from "react";
import Image from "next/image";
import FavouriteButton from "../FavouriteButton";

export default function ProjectDetails({
  project,
  onToggleFavourite,
  isFavourite,
  favourites,
}) {
  return (
    <>
      <Image src={project.image} height={200} width={400} alt={project.title} />
      <FavouriteButton
        onToggleFavourite={onToggleFavourite}
        id={project._id}
        favourites={favourites}
        isFavourite={isFavourite}
      />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <>
        <strong>Duration:</strong>
        {project.duration}
      </>
      <>
        <strong> Difficulty:</strong>
        {project.difficulty}
      </>
      {project.materials && (
        <ul>
          <h3>Material</h3>
          {project.materials.map((materials, index) => (
            <li key={index}>
              {materials.amount} {materials.material}
            </li>
          ))}
        </ul>
      )}
      <>
        <h3>Instructions</h3>
        <p>{project.instructions}</p>
      </>
    </>
  );
}
