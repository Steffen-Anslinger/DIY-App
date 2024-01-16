import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: red;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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

        <label>
          Duration
          <select {...register("duration")} defaultValue={"select..."}>
            <option value="select...">select...</option>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </select>
        </label>
        <label>
          Difficulty
          <select {...register("difficulty")} defaultValue={"select..."}>
            <option value="select...">select...</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>

        <label>
          Materials
          <input
            {...register("material.0.amount", {
              required: "Amount is required",
            })}
            type="number"
            placeholder="Number"
          />
          <StyledErrorMessage>
            {errors.material_amount?.message}
          </StyledErrorMessage>
          <input
            {...register("material.0.material", {
              required: "Material is required",
            })}
            placeholder="Material"
          />
          <StyledErrorMessage>{errors.material?.message}</StyledErrorMessage>
        </label>

        <label>
          Instructions
          <textarea
            {...register("instruction.0.steps", {
              required: "Instructions are required",
            })}
            placeholder="Instructions"
          />
          <StyledErrorMessage>
            {errors.instructions?.message}
          </StyledErrorMessage>
        </label>

        <input type="submit" />
      </StyledForm>
    </>
  );
}
