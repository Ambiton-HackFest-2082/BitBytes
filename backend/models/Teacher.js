import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  experience: String,
  rating: Number
});

export default mongoose.model('Teacher', teacherSchema);