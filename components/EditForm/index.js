import React from "react";
import StyledForm from "../Layout/StyledForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function EditForm({ project, setEditMode }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = router.query;

  const onSubmit = async (formData) => {
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await fetch(`/api/projects/${id}`);
    if (response.ok) {
      setEditMode(false);
      mutate(`/api/projects/${id}`);
    }
  };

  return (
    <>
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
            {project.material.map((material, _id) => (
              <div key={_id}>
                <label>
                  Amount:
                  <input
                    {...register(`material[${_id}].amount`)}
                    defaultValue={material.amount}
                  />
                </label>
                <label>
                  Material:
                  <input
                    {...register(`material[${_id}].material`)}
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
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button type="submit">Save</button>
      </StyledForm>
    </>
  );
}
