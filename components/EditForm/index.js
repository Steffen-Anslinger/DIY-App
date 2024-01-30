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
        <h2>Edit your project</h2>
        <StyledLabel>
          Project title
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

        {materialsFields.length > 0 && (
          <StyledFieldset>
            <legend>Materials</legend>
            <div>
              {materialsFields.map((item, index) => (
                <StyledFieldset key={item.id}>
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
                  {errors.materials && (
                    <StyledErrorMessage>
                      {errors.materials?.[index]?.amount?.message}
                    </StyledErrorMessage>
                  )}
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
                  {errors.materials && (
                    <StyledErrorMessage>
                      {errors.materials?.[index]?.material?.message}
                    </StyledErrorMessage>
                  )}
                  <button type="button" onClick={() => removeMaterials(index)}>
                    Delete
                  </button>
                </StyledFieldset>
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
          </StyledFieldset>
        )}

        {instructionsFields.length > 0 && (
          <StyledFieldset>
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
                  {errors.instructions && (
                    <StyledErrorMessage>
                      {errors.instructions?.[index]?.steps?.message}
                    </StyledErrorMessage>
                  )}
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
          </StyledFieldset>
        )}
        <StyledCancelButton onClick={() => setEditMode(false)}>
          Cancel
        </StyledCancelButton>
        <StyledSubmitButton type="submit">Save</StyledSubmitButton>
      </StyledForm>
    </>
  );
}
