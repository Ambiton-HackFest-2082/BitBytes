import mongoose from "mongoose"
const teacherSchema = new mongoose.Schema({
  userDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  experience: {
    type: String,
    required: [true, "Experience is must"]
  },
  rating: {
    type: Number,
    default: 5
  }
}, { timestamps: true })

export const Teacher = mongoose.model("Teacher", teacherSchema)