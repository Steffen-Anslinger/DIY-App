import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import StyledForm from "../Layout/FormStyles/StyledForm";
import StyledLabel from "../Layout/FormStyles/StyledLabel";
import StyledInput from "../Layout/FormStyles/StyledInput";
import StyledFieldset from "../Layout/FormStyles/StyledFieldset";
import StyledTextarea from "../Layout/FormStyles/StyledTextarea";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledLink from "../Layout/FormStyles/StyledLink";
import StyledErrorMessage from "../Layout/FormStyles/StyledErrorMessage";
import StyledDeleteButton from "../Layout/FormStyles/StyledDeleteButton";
import Image from "next/image";
import StyledMaterials from "../Layout/FormStyles/StyledMaterials";
import StyledInstructions from "../Layout/FormStyles/StyledInstructions";
import StyledAddButton from "../Layout/FormStyles/StyledAddButton";
import StyledSubmitButton from "../Layout/FormStyles/StyledSubmitButton/inex";
import upload from "@/lib/cloudinary";

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
    const uploadedImage = await upload(data.cover[0]);

    const requestData = {
      ...data,
      materials: data.materials.map((item) => ({
        ...item,
        amount: parseInt(item.amount, 10),
      })),
      instructions: data.instructions.map((item) => ({
        steps: item.steps,
      })),
      cover: uploadedImage,
    };

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
          Cover
          <StyledInput
            name="cover"
            type="file"
            {...register("cover", { required: "Image is required" })}
          />
          {errors.cover && (
            <StyledErrorMessage>{errors.cover.message}</StyledErrorMessage>
          )}
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
                  <StyledInput
                    {...register(`materials.${index}.amount`, {
                      required: "Amount is required",
                    })}
                    type="number"
                    placeholder="Number"
                    min="1"
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
            );
          })}
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
        <StyledFieldset>
          <legend>Instructions</legend>

          {instructionsFields.map((item, index) => (
            <StyledInstructions key={item.id}>
              <StyledTextarea
                {...register(`instructions.${index}.steps`, {
                  required: "Steps are required",
                })}
                placeholder="Steps"
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
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <StyledSubmitButton type="submit">Create</StyledSubmitButton>
        </div>
      </StyledForm>
    </>
  );
}
