import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  zoomLink: {
    type: String,
    required: true,
    trim: true
  },
  credentials: {
    type: String,
    default: null
  },
  scheduleTime: {
    type: Date
  }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);