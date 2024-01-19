import mongoose from "mongoose";

const { Schema } = mongoose;

const materialSchema = new Schema({
  amount: { type: Number, required: true },
  material: { type: String, required: true },
});

const instructionSchema = new Schema({
  type: { type: String, enum: ["text"], default: "text" },
  content: { type: String, required: true },
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, enum: ["short", "medium", "long"], required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  material: { type: [materialSchema], required: true },
  instructions: { type: [instructionSchema], required: true },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
