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
      materials: project.materials.map((materials) => ({
        amount: materials.amount,
        material: materials.material,
      })),
      instructions: project.instructions.map((instructions) => ({
        steps: instructions.steps,
      })),
    },
  });

  const {
    fields: materialsFields,
    append: appendMaterials,
    remove: removeMaterials,
  } = useFieldArray({
    control,
    name: "materials",
  });

  const {
    fields: instructionsFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
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

        {materialsFields.length > 0 && (
          <fieldset>
            <legend>Materials</legend>
            <div>
              {materialsFields.map((item, index) => (
                <div key={item.id}>
                  <label>
                    <span>Amount</span>
                    <input
                      {...register(`materials.${index}.amount`, {
                        required: "Amount is required",
                      })}
                      type="number"
                      placeholder="Number"
                      min="1"
                      defaultValue={item.amount}
                    />
                  </label>
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.amount?.message}
                  </StyledErrorMessage>

                  <label>
                    <span>Materials</span>
                    <input
                      {...register(`materials.${index}.material`, {
                        required: "Material is required",
                      })}
                      placeholder="Material"
                      defaultValue={item.material}
                    />
                  </label>
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.material?.message}
                  </StyledErrorMessage>

                  <button type="button" onClick={() => removeMaterials(index)}>
                    Delete
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  appendMaterials({ amount: 1, material: "" });
                }}
              >
                Add
              </button>
            </div>
          </fieldset>
        )}

        {instructionsFields.length > 0 && (
          <fieldset>
            <legend>Instructions</legend>
            <div>
              {instructionsFields.map((item, index) => (
                <div key={item.id}>
                  <label>
                    Step:
                    <textarea
                      {...register(`instructions.${index}.steps`, {
                        required: "Steps are required",
                      })}
                      placeholder="Steps"
                      defaultValue={project.instructions}
                    />
                  </label>
                  <StyledErrorMessage>
                    {errors.instructions?.[index]?.steps?.message}
                  </StyledErrorMessage>
                  <button
                    type="button"
                    onClick={() => removeInstructions(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  appendInstructions({ steps: "" });
                }}
              >
                Add
              </button>
            </div>
          </fieldset>
        )}
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button type="submit">Save</button>
      </StyledForm>
    </>
  );
}
