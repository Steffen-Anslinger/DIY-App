import styled from "styled-components";
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export default function ProjectForm({ project = {}, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Project title
          <input
            name="title"
            defaultValue={project.title}
            placeholder="Enter the project title"
            required
            autoFocus
          />
        </label>

        <label>
          Image
          <input
            name="image"
            defaultValue={project.image}
            placeholder="Enter the project image"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            defaultValue={project.description}
            placeholder="Enter the project description"
            required
          />
        </label>

        <label>
          Duration
          <select>
            <option disabled selected hidden value="selection">
              Please select
            </option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>
        <label>
          Difficulty
          <select>
            <option disabled selected hidden value="selection">
              Please select
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Material
          <input
            name="material"
            defaultValue={project.material}
            placeholder="Enter the project material"
            required
          />
        </label>

        <label>
          Instructions
          <input
            name="instruction"
            defaultValue={project.instructions}
            placeholder="Enter the project instructions"
            required
          />
        </label>

        <button>Save</button>
      </StyledForm>
    </>
  );
}
