import mongoose from 'mongoose';

const requestStatusSchema = new mongoose.Schema({
  intrestedTopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  decision_time: Date
});

export default mongoose.model('RequestStatus', requestStatusSchema);