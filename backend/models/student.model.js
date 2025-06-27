import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  userDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  grade: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})
export const Student = mongoose.model("Student", studentSchema)