export default function ProjectForm({ project = {}, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          Slug
          <input
            name="slug"
            defaultValue={project.slug}
            placeholder="Enter the slug"
            required
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
          <input
            name="duration"
            defaultValue={project.duration}
            placeholder="Enter the project duration"
            required
          />
        </label>

        <label>
          Cost
          <input
            name="cost"
            defaultValue={project.cost}
            placeholder="Enter the project cost"
            required
          />
        </label>

        <label>
          Difficulty
          <input
            name="difficulty"
            defaultValue={project.difficulty}
            placeholder="Enter the project difficulty"
            required
          />
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
      </form>
    </>
  );
}
