import { useForm } from "react-hook-form";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";


const StyledLink = styled(Link)`
background-color: lightgray;
color: black;
padding: 1em 1.5em;
text-decoration: none;
border-radius: 5px;
`

const StyledErrorMessage = styled.p`
  color: red;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export default function ProjectForm({ projects, onAddProject }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onAddProject(data);
    reset();
    router.push("/");
  };

  return (
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
          <select {...register("duration")} defaultValue={"select..."}>
            <option value="select...">select...</option>
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </select>
        </label>
        &nbsp;
        <label>
          Difficulty
          <select {...register("difficulty")} defaultValue={"select..."}>
            <option value="select...">select...</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend>Materials</legend>
        <input
          {...register("material.0.amount", {
            required: "Amount is required",
          })}
          type="number"
          placeholder="Number"
          min="1"
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
      </fieldset>

      <label>
        Instructions
        <textarea
          {...register("instruction.0.steps", {
            required: "Instructions are required",
          })}
          placeholder="Instructions"
        />
        <StyledErrorMessage>{errors.instructions?.message}</StyledErrorMessage>
      </label>
      <div>
        <StyledLink href="/">Cancel</StyledLink>
        <button type="submit">Create</button>
      </div>
    </StyledForm>
  );
}
