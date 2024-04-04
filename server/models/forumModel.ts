import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;
