import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  request_statuses_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestStatus' },
  zoomLink: String,
  scheduleTime: Date
});

export default mongoose.model('Appointment', appointmentSchema);