import mongoose from "mongoose";
import contentschema from "./contentschema.js";
const postSchema = new mongoose.Schema({
  maintitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  content: {
    type: [contentschema],
  },

  image: {
    type: String,
  },

  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const posts = new mongoose.model("posts", postSchema);
export default posts;
