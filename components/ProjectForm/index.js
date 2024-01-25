import { useForm } from "react-hook-form";
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
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
          <label>
            Amount
            <input
              {...register("material.0.amount", {
                required: "Amount is required",
              })}
              type="number"
              placeholder="Number"
              min="1"
            />
          </label>
          <StyledErrorMessage>
            {errors.material?.[0]?.amount?.message}
          </StyledErrorMessage>
          <label>
            Material
            <input
              {...register("material.0.material", {
                required: "Material is required",
              })}
              placeholder="Material"
            />
          </label>
          <StyledErrorMessage>
            {errors.material?.[0]?.material?.message}
          </StyledErrorMessage>
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
