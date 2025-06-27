import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  message: {
    type: String,
    min: 1,
    max: 250,
    required: true
  }
}, { timestamps: true });

export const Chat = mongoose.model('Chat', chatSchema);