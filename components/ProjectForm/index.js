import { useForm } from "react-hook-form";
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
        <StyledLabel>
          Project title
          <StyledInput
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
        </StyledLabel>
        {errors.title && (
          <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
        )}
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
        </StyledLabel>
        {errors.description && (
          <StyledErrorMessage>{errors.description.message}</StyledErrorMessage>
        )}
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
          </StyledLabel>
          {errors.duration && (
            <StyledErrorMessage>{errors.duration?.message}</StyledErrorMessage>
          )}
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
          </StyledLabel>
          {errors.difficulty && (
            <StyledErrorMessage>
              {errors.difficulty?.message}
            </StyledErrorMessage>
          )}
        </div>
        <StyledFieldset>
          <legend>Materials</legend>
          <StyledLabel>
            Amount
            <StyledInput
              {...register("material.0.amount", {
                required: "Amount is required",
              })}
              type="number"
              placeholder="Number"
              min="1"
            />
          </StyledLabel>
          {errors.material?.[0]?.amount && (
            <StyledErrorMessage>
              {errors.material?.[0]?.amount?.message}
            </StyledErrorMessage>
          )}
          <StyledLabel>
            Material
            <StyledInput
              {...register("material.0.material", {
                required: "Material is required",
              })}
              placeholder="Material"
            />
          </StyledLabel>
          {errors.material?.[0]?.material && (
            <StyledErrorMessage>
              {errors.material?.[0]?.material?.message}
            </StyledErrorMessage>
          )}
        </StyledFieldset>

        <StyledLabel>
          Instructions
          <StyledTextarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            placeholder="Instructions"
          />
        </StyledLabel>
        {errors.instructions && (
          <StyledErrorMessage>
            {errors.instructions?.message}
          </StyledErrorMessage>
        )}
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <StyledSubmitButton type="submit">Create</StyledSubmitButton>
        </div>
      </StyledForm>
    </>
  );
}
