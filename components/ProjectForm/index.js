import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import StyledForm from "../Layout/FormStyles/StyledForm";
import StyledLabel from "../Layout/FormStyles/StyledLabel";
import StyledInput from "../Layout/FormStyles/StyledInput";
import StyledTextarea from "../Layout/FormStyles/StyledTextarea";
import StyledSelect from "../Layout/FormStyles/StyledSelect";
import StyledLink from "../Layout/StyledLink";
import StyledErrorMessage from "../Layout/FormStyles/StyledErrorMessage";
import Image from "next/image";
import StyledMaterials from "../Layout/FormStyles/StyledMaterials";
import StyledInstructions from "../Layout/FormStyles/StyledInstructions";
import upload from "@/lib/cloudinary";
import WarningSVG from "@/public/assets/WarningIcon";
import StyledButton from "../Layout/Styled Buttons";

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
          <p>Project title</p>
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

        <StyledLabel>
          <p>Cover</p>
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

        <StyledLabel>
          <p>Description</p>
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
        <div>
          <StyledLabel>
            <p>Duration</p>
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
                <WarningSVG />
                <p>{errors.duration?.message}</p>
              </StyledErrorMessage>
            )}
          </StyledLabel>
          &nbsp;
          <StyledLabel>
            <p>Difficulty</p>
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
                <WarningSVG />
                <p> {errors.difficulty?.message}</p>
              </StyledErrorMessage>
            )}
          </StyledLabel>
        </div>
        <StyledLabel>
          <p>Materials</p>
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
                  type="icon-red"
                  onClick={() => removeMaterials(index)}
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
            type="icon-blue"
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
        <StyledLabel>
          <p>Instructions</p>

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
                type="icon-red"
                onClick={() => removeInstructions(index)}
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
            type="icon-blue"
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
        <div>
          <StyledLink href="/">Cancel</StyledLink>
          <StyledButton type="blue">Create</StyledButton>
        </div>
      </StyledForm>
    </>
  );
}
