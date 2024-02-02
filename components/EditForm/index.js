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
import StyledMaterials from "../Layout/FormStyles/StyledMaterials";
import StyledInstructions from "../Layout/FormStyles/StyledInstructions";
import StyledDeleteButton from "../Layout/FormStyles/StyledDeleteButton";
import Image from "next/image";
import StyledAddButton from "../Layout/FormStyles/StyledAddButton";
import WarningSVG from "@/public/assets/warning_FILL1_wght400_GRAD0_opsz24";

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
      alert(`Project could not be updated!`);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit your project</h2>
        <StyledLabel>
          Project title
          <StyledInput
            {...register("title", { required: "Please enter a title!" })}
            placeholder="Title"
            defaultValue={project.title}
          />
        </StyledLabel>
        {errors.title && (
          <StyledErrorMessage>
            <WarningSVG />
            <p>{errors.title.message}</p>
          </StyledErrorMessage>
        )}

        <StyledLabel>
          Description:
          <StyledTextarea
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
        <StyledLabel>
          Duration:
          <StyledSelect
            name="duration"
            {...register("duration", {
              required: "Please select the duration of your project!",
            })}
            defaultValue={project.duration}
          >
            <option value="">select...</option>
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
        <StyledLabel>
          Difficulty:
          <StyledSelect
            name="difficulty"
            {...register("difficulty", {
              required: "Please select the difficulty of your project!",
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
              <WarningSVG />
              <p> {errors.difficulty?.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>

        {materialsFields.length > 0 && (
          <StyledFieldset>
            <legend>Materials</legend>
            {materialsFields.map((item, index) => (
              <StyledMaterials key={item.id}>
                <StyledLabel>
                  <StyledInput
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

                <StyledLabel>
                  <StyledInput
                    {...register(`materials.${index}.material`, {
                      required: "Please enter your material!",
                    })}
                    placeholder="Material"
                    defaultValue={item.material}
                  />{" "}
                  {errors.materials?.[index]?.material && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.materials?.[index]?.material?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledDeleteButton
                  type="button"
                  onClick={() => removeMaterials(index)}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Delete Button"
                    width={25}
                    height={25}
                  />
                </StyledDeleteButton>
              </StyledMaterials>
            ))}

            <StyledAddButton
              type="button"
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
            </StyledAddButton>
          </StyledFieldset>
        )}

        {instructionsFields.length > 0 && (
          <StyledFieldset>
            <legend>Instructions</legend>

            {instructionsFields.map((item, index) => (
              <StyledInstructions key={item.id}>
                <StyledLabel>
                  <StyledTextarea
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
                <StyledDeleteButton
                  type="button"
                  onClick={() => removeInstructions(index)}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Delete Button"
                    width={25}
                    height={25}
                  />
                </StyledDeleteButton>
              </StyledInstructions>
            ))}
            <StyledAddButton
              type="button"
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
            </StyledAddButton>
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
