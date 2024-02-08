import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { mutate } from "swr";
import StyledForm from "../Design/FormStyles/StyledForm";
import StyledLabel from "../Design/FormStyles/StyledLabel";
import StyledInput from "../Design/FormStyles/StyledInput";
import StyledTextarea from "../Design/FormStyles/StyledTextarea";
import StyledSelect from "../Design/FormStyles/StyledSelect";
import StyledErrorMessage from "../Design/FormStyles/StyledErrorMessage";
import StyledMaterials from "../Design/FormStyles/StyledMaterials";
import StyledInstructions from "../Design/FormStyles/StyledInstructions";
import Image from "next/image";
import WarningSVG from "@/components/Design/SVGs/WarningIcon";
import StyledButton from "../Design/StyledButtons";
import upload from "@/lib/cloudinary";

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
    if (formData.cover[0]) {
      const uploadedImage = await upload(formData.cover[0]);
      formData.cover = uploadedImage;
    } else {
      formData.cover = project.cover;
    }
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
      alert(`Project could not be updated!`);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit your project</h2>
        <StyledLabel htmlFor="project title">
          Project title
          <StyledInput
            id="project title"
            {...register("title", { required: "Please enter a title!" })}
            placeholder="Title"
            defaultValue={project.title}
          />
          {errors.title && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.title.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        <StyledLabel htmlFor="cover image">
          Cover
          <input
            id="cover image"
            name="cover"
            type="file"
            {...register("cover")}
          />
          {errors.cover && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.cover.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        {project.cover.url && (
          <p>
            Current Cover:
            <Image
              src={project.cover.url}
              alt="Current Cover"
              width={150}
              height={150}
            />
          </p>
        )}
        &nbsp;
        <StyledLabel htmlFor="description">
          Description
          <StyledTextarea
            id="description"
            {...register("description", {
              required: "Please describe your project!",
            })}
            placeholder="Description"
            defaultValue={project.description}
          />
          {errors.description && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.description.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
        <StyledLabel htmlFor="duration">
          Duration
          <StyledSelect
            id="duration"
            name="duration"
            {...register("duration", {
              required: "Please select the duration of your project!",
            })}
            defaultValue={project.duration}
          >
            <option value="" hidden>
              select...
            </option>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </StyledSelect>
          {errors.duration && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.duration?.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
        <StyledLabel htmlFor="difficulty">
          Difficulty
          <StyledSelect
            id="difficulty"
            name="difficulty"
            {...register("difficulty", {
              required: "Please select the difficulty of your project!",
            })}
            defaultValue={project.difficulty}
          >
            <option value="" hidden>
              select...
            </option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </StyledSelect>
          {errors.difficulty && (
            <StyledErrorMessage>
              <WarningSVG />
              <p> {errors.difficulty?.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
        {materialsFields.length > 0 && (
          <StyledLabel htmlFor="materials">
            Materials
            {materialsFields.map((item, index) => (
              <StyledMaterials key={item.id}>
                <StyledLabel htmlFor="amount">
                  <StyledInput
                    id="amount"
                    {...register(`materials.${index}.amount`, {
                      required: "Please enter the amount!",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                    defaultValue={item.amount}
                  />
                  {errors.materials?.[index]?.amount && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.materials?.[index]?.amount?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledLabel htmlFor="material">
                  <StyledInput
                    id="material"
                    {...register(`materials.${index}.material`, {
                      required: "Please enter your material!",
                    })}
                    placeholder="Material"
                    defaultValue={item.material}
                  />
                  {errors.materials?.[index]?.material && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.materials?.[index]?.material?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledButton
                  aria-label="remove material and amount"
                  type="button"
                  name="icon-red"
                  onClick={() => removeMaterials(index)}
                  disabled={materialsFields.length < 2}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Reset duration button"
                    width={15}
                    height={15}
                  />
                </StyledButton>
              </StyledMaterials>
            ))}
            <StyledButton
              aria-label="add more materials"
              type="button"
              name="icon-blue"
              onClick={() => {
                appendMaterials({ amount: 1, material: "" });
              }}
            >
              <Image
                src={"/assets/add_FILL0_wght400_GRAD0_opsz24.svg"}
                alt="Add Button"
                width={20}
                height={20}
              />
            </StyledButton>
          </StyledLabel>
        )}
        &nbsp;
        {instructionsFields.length > 0 && (
          <StyledLabel htmlFor="instructions">
            Instructions
            {instructionsFields.map((item, index) => (
              <StyledInstructions key={item.id}>
                <StyledLabel htmlFor="instruction steps">
                  <StyledTextarea
                    id="instruction steps"
                    {...register(`instructions.${index}.steps`, {
                      required:
                        "Please provide some steps for the instructions!",
                    })}
                    placeholder="Steps"
                    defaultValue={project.instructions}
                  />
                  {errors.instructions?.[index]?.steps && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.instructions?.[index]?.steps?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledButton
                  aria-label="remove instruction"
                  type="button"
                  name="icon-red"
                  onClick={() => removeInstructions(index)}
                  disabled={instructionsFields.length < 2}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Reset duration button"
                    width={15}
                    height={15}
                  />
                </StyledButton>
              </StyledInstructions>
            ))}
            <StyledButton
              aria-label="add more steps"
              type="button"
              name="icon-blue"
              onClick={() => {
                appendInstructions({ steps: "" });
              }}
            >
              <Image
                src={"/assets/add_FILL0_wght400_GRAD0_opsz24.svg"}
                alt="Add Button"
                width={20}
                height={20}
              />
            </StyledButton>
          </StyledLabel>
        )}
        <StyledButton
          aria-label="cancel the editing process"
          type="button"
          name="grey"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </StyledButton>
        <StyledButton type="submit" name="orange" aria-label="save changes">
          Save
        </StyledButton>
      </StyledForm>
    </>
  );
}
