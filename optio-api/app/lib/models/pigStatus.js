import mongoose, { Schema } from "mongoose";

// Pig Status Schema
const pigStatusSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const PigStatus =
  mongoose.models.PigStatus || mongoose.model("PigStatus", pigStatusSchema);

export default PigStatus;
