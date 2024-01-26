import React from "react";
import StyledForm from "../Layout/FormStyles/StyledForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { mutate } from "swr";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: red;
`;

export default function EditForm({ project, setEditMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { id } = router.query;

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
      mutate(`/api/projects/${id}`);
      mutate(`/api/projects`);
    } else {
      response.status(404).json({ status: `Project could not be updated!` });
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            defaultValue={project.title}
          />
        </label>
        <StyledErrorMessage>{errors.title?.message}</StyledErrorMessage>
        <label>
          Image:
          <input {...register("image")} defaultValue={project.image} />
        </label>
        <label>
          Description:
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            defaultValue={project.description}
          />
          <StyledErrorMessage>{errors.description?.message}</StyledErrorMessage>
        </label>
        <label>
          Duration:
          <select
            name="duration"
            {...register("duration", {
              required: "Please select an option!",
            })}
            defaultValue={project.duration}
          >
            <option value="">select...</option>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </select>
          <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
        </label>
        <label>
          Difficulty:
          <select
            name="difficulty"
            {...register("difficulty", {
              required: "Please select an option!",
            })}
            defaultValue={project.difficulty}
          >
            <option value="">select...</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <StyledErrorMessage>{errors.difficulty?.message}</StyledErrorMessage>
        </label>
        {project.material && (
          <div>
            <h3>Material</h3>
            {project.material.map((material, _id) => (
              <div key={_id}>
                <label>
                  Amount:
                  <input
                    {...register("material.0.amount", {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                    defaultValue={material.amount}
                  />
                  <StyledErrorMessage>
                    {errors.material?.[0]?.amount?.message}
                  </StyledErrorMessage>
                </label>
                <label>
                  Material:
                  <input
                    {...register("material.0.material", {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                    defaultValue={material.material}
                  />
                  <StyledErrorMessage>
                    {errors.material?.[0]?.material?.message}
                  </StyledErrorMessage>
                </label>
              </div>
            ))}
          </div>
        )}
        <label>
          Instructions:
          <textarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            placeholder="Instructions"
            defaultValue={project.instructions}
          />
          <StyledErrorMessage>
            {errors.instructions?.message}
          </StyledErrorMessage>
        </label>
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button type="submit">Save</button>
      </StyledForm>
    </>
  );
}
