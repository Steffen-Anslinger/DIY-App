import mongoose from "mongoose";

const { Schema } = mongoose;

const materialsSchema = new Schema({
  amount: { type: Number, required: true },
  materials: { type: String, required: true },
});

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    duration: {
      type: String,
      enum: ["select...", "short", "medium", "long"],
    },
    difficulty: {
      type: String,
      enum: ["select...", "easy", "medium", "hard"],
    },
    materials: { type: [materialsSchema], required: true },
    instructions: { type: String, required: true },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
