import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import StyledForm from "../Layout/FormStyles/StyledForm";
import StyledLabel from "../Layout/FormStyles/StyledLabel";
import StyledInput from "../Layout/FormStyles/StyledInput";
import StyledFieldset from "../Layout/FormStyles/StyledFieldset";
import StyledTextarea from "../Layout/FormStyles/StyledTextarea";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledSubmitButton from "../Layout/FormStyles/StyledSubmitButton/inex";
import StyledLink from "../Layout/FormStyles/StyledLink";
import StyledErrorMessage from "../Layout/FormStyles/StyledErrorMessage";
import styled from "styled-components";

const StyledMaterials = styled.div`
  display: flex;
  height: fit-content;
`;

export default function ProjectForm() {
  const { mutate } = useSWR("/api/projects");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      materials: [{ amount: 1, material: "" }],
      instructions: [{ steps: "" }],
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

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      materials: data.materials.map((item) => ({
        ...item,
        amount: parseInt(item.amount, 10),
      })),
      instructions: data.instructions.map((item) => ({
        steps: item.steps,
      })),
    };

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    console.log(requestData);
    const response = await fetch("/api/projects", request);

    if (response.ok) {
      mutate();
      reset();
      router.push("/");
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new project</h2>
        <StyledLabel>
          Project title
          <StyledInput
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
          {errors.title && (
            <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
          )}
        </StyledLabel>

        <StyledLabel>
          Image
          <StyledInput {...register("image")} placeholder="Select Image" />
        </StyledLabel>

        <StyledLabel>
          Description
          <StyledTextarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
          />
          {errors.description && (
            <StyledErrorMessage>
              {errors.description.message}
            </StyledErrorMessage>
          )}
        </StyledLabel>
        <div>
          <StyledLabel>
            Duration
            <StyledSelect
              name="duration"
              {...register("duration", {
                required: "Please select an option!",
              })}
              defaultValue={""}
            >
              <option value="">select...</option>
              <option value="short">short</option>
              <option value="medium">medium</option>
              <option value="long">long</option>
            </StyledSelect>
            {errors.duration && (
              <StyledErrorMessage>
                {errors.duration?.message}
              </StyledErrorMessage>
            )}
          </StyledLabel>
          &nbsp;
          <StyledLabel>
            Difficulty
            <StyledSelect
              name="difficulty"
              {...register("difficulty", {
                required: "Please select an option!",
              })}
              defaultValue={""}
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
        </div>
        <StyledFieldset>
          <legend>Materials</legend>
          {materialsFields.map((item, index) => {
            return (
              <StyledMaterials key={item.id}>
                <StyledLabel>
                  <span>Amount</span>
                  <StyledInput
                    {...register(`materials.${index}.amount`, {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
                  />
                </StyledLabel>
                {errors.materials && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.amount?.message}
                  </StyledErrorMessage>
                )}

                <StyledLabel>
                  <span>Material</span>
                  <StyledInput
                    {...register(`materials.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                  />
                </StyledLabel>
                {errors.materials && (
                  <StyledErrorMessage>
                    {errors.materials?.[index]?.material?.message}
                  </StyledErrorMessage>
                )}
                <button type="button" onClick={() => removeMaterials(index)}>
                  Delete
                </button>
              </StyledMaterials>
            );
          })}
          <button
            type="button"
            onClick={() => {
              appendMaterials({ amount: 1, material: "" });
            }}
          >
            Add
          </button>
        </StyledFieldset>
        <StyledFieldset>
          <legend>Instructions</legend>
          <div>
            {instructionsFields.map((item, index) => (
              <div key={item.id}>
                <StyledLabel>
                  Step:
                  <StyledTextarea
                    {...register(`instructions.${index}.steps`, {
                      required: "Steps are required",
                    })}
                    placeholder="Steps"
                  />
                </StyledLabel>

                {errors.instructions && (
                  <StyledErrorMessage>
                    {errors.instructions?.[index]?.steps?.message}
                  </StyledErrorMessage>
                )}

                <button type="button" onClick={() => removeInstructions(index)}>
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
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <StyledSubmitButton type="submit">Create</StyledSubmitButton>
        </div>
      </StyledForm>
    </>
  );
}
