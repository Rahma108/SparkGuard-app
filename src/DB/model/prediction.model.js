import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
    result: {
        type: String, // "normal" | "not normal"
        required: true
    },

    prediction: {
        type: Number, // 0 = normal, 1 = theft
        required: true
    },

    confidence: {
        type: Number,
        default: 0
    },

    variation: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export const PredictionModel =
  mongoose.models.Prediction || mongoose.model("Prediction", predictionSchema);