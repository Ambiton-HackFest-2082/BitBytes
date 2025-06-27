import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proposed_price: Number,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  appointmentTime: Date,
  message: String,
  offeredTo:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  status:{
    type:String,
    enum:["Pending", "Accepted", "Rejected"],
    default:"Pending"
  }
});

export const Offer =  mongoose.model('Offer', offerSchema);