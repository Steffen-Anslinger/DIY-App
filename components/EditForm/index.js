import React from "react";
import StyledForm from "../Layout/StyledForm";
import { useForm, useFieldArray } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      material: project.material.map((material) => ({
        amount: material.amount,
        material: material.material,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "material",
  });

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

        {fields.length > 0 && (
          <div>
            {fields.map((item, index) => (
              <div key={item.id}>
                <label>
                  <span>Amount</span>
                  <input
                    {...register(`material.${index}.amount`, {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                    defaultValue={item.amount}
                  />
                </label>
                <StyledErrorMessage>
                  {errors.material?.[index]?.amount?.message}
                </StyledErrorMessage>

                <label>
                  <span>Material</span>
                  <input
                    {...register(`material.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                    defaultValue={item.material}
                  />
                </label>
                <StyledErrorMessage>
                  {errors.material?.[index]?.material?.message}
                </StyledErrorMessage>

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                append({ amount: 1, material: "" });
              }}
            >
              Add
            </button>
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
