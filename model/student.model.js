const mongoose = require('mongoose');
const modelSchema = new mongoose.Schema(
    {
        modelID: String,
        name: String,
        mssv: String,
        gender: String,
        major: String,
        birth: Date,
        role: String,
        jobDescription: String,
    }
);
const model = mongoose.model("STUDENT", modelSchema);
module.exports = model;