import { useForm, useFieldArray, Controller } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import StyledLink from "../Layout/StyledLinkButton";
import useSWR from "swr";
import StyledForm from "../Layout/StyledForm";

const StyledErrorMessage = styled.p`
  color: red;
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
        <label>
          Project title
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
          <StyledErrorMessage>{errors.title?.message}</StyledErrorMessage>
        </label>

        <label>
          Image
          <input {...register("image")} placeholder="Select Image" />
        </label>

        <label>
          Description
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
          />
          <StyledErrorMessage>{errors.description?.message}</StyledErrorMessage>
        </label>
        <div>
          <label>
            Duration
            <select
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
            </select>
            <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
          </label>
          &nbsp;
          <label>
            Difficulty
            <select
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
            </select>
            <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
          </label>
        </div>
        <fieldset>
          <legend>Materials</legend>
          {materialsFields.map((item, index) => {
            return (
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
                  />
                </label>
                <StyledErrorMessage>
                  {errors.materials?.[index]?.amount?.message}
                </StyledErrorMessage>

                <label>
                  <span>Material</span>
                  <input
                    {...register(`materials.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                  />
                </label>
                <StyledErrorMessage>
                  {errors.materials?.[index]?.material?.message}
                </StyledErrorMessage>
                <button type="button" onClick={() => removeMaterials(index)}>
                  Delete
                </button>
              </div>
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
        </fieldset>
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
                  />
                </label>
                <StyledErrorMessage>
                  {errors.instructions?.[index]?.steps?.message}
                </StyledErrorMessage>
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
        </fieldset>
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <button type="submit">Create</button>
        </div>
      </StyledForm>
    </>
  );
}
