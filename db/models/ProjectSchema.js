import mongoose from "mongoose";

const { Schema } = mongoose;

const materialsSchema = new Schema({
  amount: { type: Number, required: true },
  material: { type: String, required: true },
});

const instructionsSchema = new Schema({
  steps: { type: String, required: true },
});

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    cover: {
      type: new Schema({
        width: Number,
        height: Number,
        url: String,
      }),
      required: true,
    },
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
    instructions: { type: [instructionsSchema], required: true },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
