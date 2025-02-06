import mongoose, { Schema } from "mongoose";

// Animal Schema
const animalSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  creditCount: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
});
const Animal = mongoose.models.Animal || mongoose.model("Animal", animalSchema);

export default Animal;
