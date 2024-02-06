import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import StyledForm from "../Design/FormStyles/StyledForm";
import StyledLabel from "../Design/FormStyles/StyledLabel";
import StyledInput from "../Design/FormStyles/StyledInput";
import StyledTextarea from "../Design/FormStyles/StyledTextarea";
import StyledSelect from "../Design/FormStyles/StyledSelect";
import StyledLink from "../Design/StyledLink";
import StyledErrorMessage from "../Design/FormStyles/StyledErrorMessage";
import Image from "next/image";
import StyledMaterials from "../Design/FormStyles/StyledMaterials";
import StyledInstructions from "../Design/FormStyles/StyledInstructions";
import upload from "@/lib/cloudinary";
import WarningSVG from "@/components/Design/SVGs/WarningIcon";
import StyledButton from "../Design/StyledButtons";

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
            {...register("title", { required: "Please enter a title!" })}
            placeholder="Title"
          />
          {errors.title && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.title.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
        <StyledLabel>
          Cover
          <input
            name="cover"
            type="file"
            {...register("cover", { required: "Please upload an image!" })}
          />
          {errors.cover && (
            <StyledErrorMessage>
              <WarningSVG />
              <p>{errors.cover.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
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
              <WarningSVG />
              <p>{errors.description.message}</p>
            </StyledErrorMessage>
          )}
        </StyledLabel>
        &nbsp;
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
              <option value="" hidden>
                select...
              </option>
              <option value="short">short</option>
              <option value="medium">medium</option>
              <option value="long">long</option>
            </StyledSelect>
            {errors.duration && (
              <StyledErrorMessage>
                <WarningSVG />
                <p>{errors.duration?.message}</p>
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
              <option value="" hidden>
                select...
              </option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </StyledSelect>
            {errors.difficulty && (
              <StyledErrorMessage>
                <WarningSVG />
                <p> {errors.difficulty?.message}</p>
              </StyledErrorMessage>
            )}
          </StyledLabel>
          &nbsp;
        </div>
        <StyledLabel>
          Materials
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
                  {errors.materials?.[index]?.amount && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.materials?.[index]?.amount?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledLabel>
                  <StyledInput
                    {...register(`materials.${index}.material`, {
                      required: "Material is required",
                    })}
                    placeholder="Material"
                  />
                  {errors.materials?.[index]?.material && (
                    <StyledErrorMessage>
                      <WarningSVG />
                      <p>{errors.materials?.[index]?.material?.message}</p>
                    </StyledErrorMessage>
                  )}
                </StyledLabel>

                <StyledButton
                  type="button"
                  name="icon-red"
                  onClick={() => removeMaterials(index)}
                  disabled={materialsFields.length < 2}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Delete Button"
                    width={15}
                    height={15}
                  />
                </StyledButton>
              </StyledMaterials>
            );
          })}
          <StyledButton
            type="button"
            name="icon-blue"
            onClick={() => {
              appendMaterials({ amount: 1, material: "" });
            }}
          >
            <Image
              src={"/assets/add_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Add Button"
              width={15}
              height={15}
            />
          </StyledButton>
        </StyledLabel>
        &nbsp;
        <StyledLabel>
          Instructions
          {instructionsFields.map((item, index) => (
            <StyledInstructions key={item.id}>
              <StyledLabel>
                <StyledTextarea
                  {...register(`instructions.${index}.steps`, {
                    required: "Steps are required",
                  })}
                  placeholder="Steps"
                />

                {errors.instructions?.[index]?.steps && (
                  <StyledErrorMessage>
                    <WarningSVG />
                    <p>{errors.instructions?.[index]?.steps?.message}</p>
                  </StyledErrorMessage>
                )}
              </StyledLabel>
              <StyledButton
                type="button"
                name="icon-red"
                onClick={() => removeInstructions(index)}
                disabled={instructionsFields.length < 2}
              >
                <Image
                  src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                  alt="Delete Button"
                  width={15}
                  height={15}
                />
              </StyledButton>
            </StyledInstructions>
          ))}
          <StyledButton
            type="button"
            name="icon-blue"
            onClick={() => {
              appendInstructions({ steps: "" });
            }}
          >
            <Image
              src={"/assets/add_FILL0_wght400_GRAD0_opsz24.svg"}
              alt="Add Button"
              width={15}
              height={15}
            />
          </StyledButton>
        </StyledLabel>
        &nbsp;
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <StyledButton type="submit" name="blue">
            Create
          </StyledButton>
        </div>
      </StyledForm>
    </>
  );
}
