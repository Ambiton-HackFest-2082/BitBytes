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
});

// ✅ Prevent model overwrite during hot-reload or multiple imports
export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
