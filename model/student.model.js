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
        description: String,
    }
);
const model = mongoose.model("STUDENT", modelSchema);
module.exports = model;