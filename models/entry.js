const mongoose = require("mongoose");
const entry = new mongoose.Schema({
    email: String,
    recommendation: String,
    classId: String,
    clicks: Object,
    university: String,
    details: String,
    detailsRed: String,
    detailsYellow: String,
    detailsGreen: String,
    date: Date
})

module.exports = mongoose.model("entry", entry);