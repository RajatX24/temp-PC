import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const AdminModel = new mongoose.model("Admin", adminSchema);

export default AdminModel;
