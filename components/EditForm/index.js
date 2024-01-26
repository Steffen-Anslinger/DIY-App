import React from "react";
import StyledForm from "../Layout/FormStyles/StyledForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { mutate } from "swr";
import StyledLabel from "../Layout/FormStyles/StyledLabel";
import StyledInput from "../Layout/FormStyles/StyledInput";
import StyledFieldset from "../Layout/FormStyles/StyledFieldset";
import StyledTextarea from "../Layout/FormStyles/StyledTextarea";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledSubmitButton from "../Layout/FormStyles/StyledSubmitButton/inex";
import StyledErrorMessage from "../Layout/FormStyles/StyledErrorMessage";
import StyledCancelButton from "../Layout/FormStyles/StyledCancelButton";

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
          Image
          <StyledInput {...register("image")} defaultValue={project.image} />
        </StyledLabel>
        <StyledLabel>
          Description
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
          Duration
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
        </StyledLabel>
        {errors.duration && (
          <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
        )}
        <StyledLabel>
          Difficulty
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
        </StyledLabel>
        {errors.difficulty && (
          <StyledErrorMessage>{errors.difficulty?.message}</StyledErrorMessage>
        )}
        {project.material && (
          <StyledFieldset>
            <legend>Materials</legend>
            {project.material.map((material, _id) => (
              <div key={_id}>
                <StyledLabel>
                  Amount:
                  <StyledInput
                    {...register("material.0.amount", {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                    defaultValue={material.amount}
                  />
                </StyledLabel>
                {errors.material?.[0]?.amount && (
                  <StyledErrorMessage>
                    {errors.material?.[0]?.amount?.message}
                  </StyledErrorMessage>
                )}
                <StyledLabel>
                  Material:
                  <StyledInput
                    {...register("material.0.material", {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                    defaultValue={material.material}
                  />
                </StyledLabel>
                {errors.material?.[0]?.material && (
                  <StyledErrorMessage>
                    {errors.material?.[0]?.material?.message}
                  </StyledErrorMessage>
                )}
              </div>
            ))}
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
        </StyledLabel>
        {errors.instructions && (
          <StyledErrorMessage>
            {errors.instructions?.message}
          </StyledErrorMessage>
        )}
        <StyledCancelButton onClick={() => setEditMode(false)}>
          Cancel
        </StyledCancelButton>
        <StyledSubmitButton type="submit">Save</StyledSubmitButton>
      </StyledForm>
    </>
  );
}
