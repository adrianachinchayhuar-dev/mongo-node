import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: { type: String, unique: true },

    // ---- Campos agregados en la TAREA ----
    age: { type: Number, min: 18, required: true },
    phoneNumber: { type: String },
    password: { type: String, minlength: 8, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);