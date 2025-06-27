import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
  zoomLink: String,
  scheduleTime: Date
});

export default mongoose.model('Appointment', appointmentSchema);