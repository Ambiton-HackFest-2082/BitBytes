import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  session: String,
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
});

export default mongoose.model('Session', sessionSchema);