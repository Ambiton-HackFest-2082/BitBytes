import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  topic: {
    type: String,
    min: 5,
    max: 200,
    required: true
  },
  description: {
    type: String,
  },
  budget: {
    type: Number,
    default: 0
  },
  appointmentTime: Date,
  studentDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

export default mongoose.model('Post', postSchema);