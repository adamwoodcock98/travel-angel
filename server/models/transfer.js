const mongoose = require("mongoose");



const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;