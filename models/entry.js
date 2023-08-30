const mongoose = require("mongoose");
const entry = new mongoose.Schema({
    email: String,
    recommendation: String,
    classId: String,
    clicks: Object
})

module.exports = mongoose.model("entry", entry);