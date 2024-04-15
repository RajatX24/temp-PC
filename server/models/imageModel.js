import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    image: String,
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;
