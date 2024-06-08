import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Thread = mongoose.model('Thread', threadSchema);

export default Thread;
