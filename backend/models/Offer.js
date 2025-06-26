import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  proposed_price: Number,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  appointmentTime: Date,
  message: String
});

export default mongoose.model('Offer', offerSchema);