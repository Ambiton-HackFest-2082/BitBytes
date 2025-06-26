import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  grade: String,
  school: String
});

export default mongoose.model('Student', studentSchema);