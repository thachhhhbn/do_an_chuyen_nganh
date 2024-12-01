const mongoose = require('mongoose');
const modelSchema = new mongoose.Schema(
    {
        id: String,
        ten: String,
        mssv: String,
        gioitinh: String,
        chuyen_nganh: String,
        ngaysinh: String,
        vaitro: String,
        decription: String,
    }
);
const model = mongoose.model("STUDENT", modelSchema, 'students');
module.exports = model;