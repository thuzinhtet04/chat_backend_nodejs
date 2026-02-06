import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
