import React from "react";
import StyledForm from "../Layout/StyledForm";

export default function EditForm({
  project,
  onSubmit,
  register,
  handleSubmit,
}) {
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <input {...register("title")} defaultValue={project.title} />
      </label>
      <label>
        Image:
        <input {...register("image")} defaultValue={project.image} />
      </label>
      <label>
        Description:
        <textarea
          {...register("description")}
          defaultValue={project.description}
        />
      </label>
      <label>
        Duration:
        <select {...register("duration")} defaultValue={project.duration}>
          <option value="select...">select...</option>
          <option value="short">short</option>
          <option value="medium">medium</option>
          <option value="long">long</option>
        </select>
      </label>
      <label>
        Difficulty:
        <select {...register("difficulty")} defaultValue={project.difficulty}>
          <option value="select...">select...</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </label>
      {project.material && (
        <div>
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
        </div>
      )}
      <label>
        Instructions:
        <textarea
          {...register("instructions")}
          defaultValue={project.instructions}
        />
      </label>
    </StyledForm>
  );
}
