import mongoose from "mongoose";
// import { userSchema } from "../utlis/user.schema.js";
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const voteSchema = new mongoose.Schema({
  Angular: Number,
  React: Number,
  Both: Number,
});
export const User = mongoose.model("Information", userSchema);

export const Votes = mongoose.model("votes", voteSchema);
mongoose
  .connect("mongodb://localhost:27017/VoteApp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
