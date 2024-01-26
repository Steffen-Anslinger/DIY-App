import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import StyledForm from "../Layout/StyledForm";
import color from "../Layout/Colors";
import Link from "next/link";

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

  const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    color: ${color.grey[950]};
  `;
  const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid ${color.grey[300]};
    border-radius: 4px;
    box-sizing: border-box;
  `;
  const StyledFieldset = styled.fieldset`
    margin-top: 20px;
    border: 1px solid ${color.grey[300]};
    border-radius: 10px;
    padding: 15px;
  `;
  const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid ${color.grey[300]};
    border-radius: 4px;
    box-sizing: border-box;
  `;

  const StyledSelect = styled.select`
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  `;

  const StyledSubmitButton = styled.button`
    font-size: 14px;
    background-color: ${color.orange[600]};
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${color.orange[700]};
    }
  `;

  const StyledLink = styled(Link)`
    font-size: 14px;
    font-weight: 500;
    color: ${color.grey[950]};
    text-decoration: none;
    margin-right: 10px;
    background-color: ${color.grey[200]};
    padding: 10px 20px;
    border-radius: 5px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
      background-color: ${color.grey[300]};
    }
  `;

  const StyledErrorMessage = styled.p`
    color: ${color.red[600]};
    background-color: ${color.red[100]};
    margin-top: 4px;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
  `;

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
