import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { mutate } from "swr";
import StyledForm from "../Layout/FormStyles/StyledForm";
import StyledLabel from "../Layout/FormStyles/StyledLabel";
import StyledInput from "../Layout/FormStyles/StyledInput";
import StyledFieldset from "../Layout/FormStyles/StyledFieldset";
import StyledTextarea from "../Layout/FormStyles/StyledTextarea";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledSubmitButton from "../Layout/FormStyles/StyledSubmitButton/inex";
import StyledCancelButton from "../Layout/FormStyles/StyledCancelButton";
import StyledErrorMessage from "../Layout/FormStyles/StyledErrorMessage";

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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
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
        <h2>Edit your project</h2>
        <StyledLabel>
          Title:
          <StyledInput
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            defaultValue={project.title}
          />
        </StyledLabel>
        {errors.title && (
          <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
        )}
        <StyledLabel>
          Image:
          <StyledInput {...register("image")} defaultValue={project.image} />
        </StyledLabel>
        <StyledLabel>
          Description:
          <StyledTextarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            defaultValue={project.description}
          />
          {errors.description && (
            <StyledErrorMessage>
              {errors.description.message}
            </StyledErrorMessage>
          )}
        </StyledLabel>
        <StyledLabel>
          Duration:
          <StyledSelect
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
          </StyledSelect>
          {errors.duration && (
            <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
          )}
        </StyledLabel>
        <StyledLabel>
          Difficulty:
          <StyledSelect
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
          </StyledSelect>
          {errors.difficulty && (
            <StyledErrorMessage>
              {errors.difficulty?.message}
            </StyledErrorMessage>
          )}
        </StyledLabel>

        {fields.length > 0 && (
          <StyledFieldset>
            <legend>Materials</legend>
            {fields.map((item, index) => (
              <StyledFieldset key={item.id}>
                <StyledLabel>
                  <span>Amount</span>
                  <StyledInput
                    {...register(`materials.${index}.amount`, {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                    defaultValue={item.amount}
                  />
                </StyledLabel>
                {errors.materials && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.amount?.message}
                  </StyledErrorMessage>
                )}
                &nbsp;
                <StyledLabel>
                  <span>Materials</span>
                  <StyledInput
                    {...register(`materials.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                    defaultValue={item.material}
                  />
                </StyledLabel>
                {errors.materials && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.material?.message}
                  </StyledErrorMessage>
                )}
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </StyledFieldset>
            ))}

            <button
              type="button"
              onClick={() => {
                append({ amount: 1, material: "" });
              }}
            >
              Add
            </button>
          </StyledFieldset>
        )}

        <StyledLabel>
          Instructions:
          <StyledTextarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            placeholder="Instructions"
            defaultValue={project.instructions}
          />
          {errors.instructions && (
            <StyledErrorMessage>
              {errors.instructions?.message}
            </StyledErrorMessage>
          )}
        </StyledLabel>
        <StyledCancelButton onClick={() => setEditMode(false)}>
          Cancel
        </StyledCancelButton>
        <StyledSubmitButton type="submit">Save</StyledSubmitButton>
      </StyledForm>
    </>
  );
}
