import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  topic: {
    type: String,
    min: 5,
    max: 200,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  description: {
    type: String,
  },
  budget: {
    type: Number,
    default: 0
  },
  appointmentTime: Date,
  studentDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps: true});

export const Post = mongoose.model('Post', postSchema);