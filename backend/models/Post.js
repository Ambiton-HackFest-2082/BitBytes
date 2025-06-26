import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  topic: String,
  description: String,
  budget: String,
  appointmentTime: Date,
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

export default mongoose.model('Post', postSchema);