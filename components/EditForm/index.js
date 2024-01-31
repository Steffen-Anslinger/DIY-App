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
      // cover: project.cover.url,
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

  async function upload(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dihl2eult/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      return {
        url: responseData.secure_url,
        width: responseData.width,
        height: responseData.height,
      };
    } catch (error) {
      console.error("Upload failed:", error.message);
      throw error;
    }
  }

  const router = useRouter();
  const { id } = router.query;

  const onSubmit = async (formData) => {
    console.log(formData);
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
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            defaultValue={project.title}
          />
        </StyledLabel>
        {errors.title && (
          <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
        )}

        {/* <StyledLabel>
          Cover
          <StyledInput
            name="cover"
            type="file"
            {...register("cover", { required: !project.cover })}
          />
          {project.cover ? (
            <Image
              src={project.cover.url}
              width={project.cover.width}
              height={project.cover.height}
              alt={project.title}
            />
          ) : (
            "No picture selected"
          )}
          {errors.cover && (
            <StyledErrorMessage>{errors.cover.message}</StyledErrorMessage>
          )}
        </StyledLabel> */}

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
            {materialsFields.map((item, index) => (
              <StyledMaterials key={item.id}>
                <StyledLabel>
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
                {errors.materials?.[index].amount && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.amount?.message}
                  </StyledErrorMessage>
                )}
                <StyledLabel>
                  <StyledInput
                    {...register(`materials.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                    defaultValue={item.material}
                  />
                </StyledLabel>
                {errors.materials?.[index].material && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.material?.message}
                  </StyledErrorMessage>
                )}
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
                <StyledTextarea
                  {...register(`instructions.${index}.steps`, {
                    required: "Steps are required",
                  })}
                  placeholder="Steps"
                  defaultValue={project.instructions}
                />
                {errors.instructions && (
                  <StyledErrorMessage>
                    {errors.instructions?.[index]?.steps?.message}
                  </StyledErrorMessage>
                )}
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
