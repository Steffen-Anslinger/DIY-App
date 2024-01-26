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
      material: [{ amount: 1, material: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "material",
  });

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      material: data.material.map((item) => ({
        ...item,
        amount: parseInt(item.amount, 10),
      })),
    };

    console.log(requestData);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };

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
          {fields.map((item, index) => {
            return (
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
                  />
                </label>
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
                <StyledErrorMessage>
                  {errors.material?.[index]?.material?.message}
                </StyledErrorMessage>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              append({ amount: 1, material: "" });
            }}
          >
            Add
          </button>
        </fieldset>

        <label>
          Instructions
          <textarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            placeholder="Instructions"
          />
          <StyledErrorMessage>
            {errors.instructions?.message}
          </StyledErrorMessage>
        </label>
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <button type="submit">Create</button>
        </div>
      </StyledForm>
    </>
  );
}
