import mongoose from "mongoose"
const reviewSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        max: 250
    }
}, { timestamps: true })
export const Review = mongoose.model("Review", reviewSchema)