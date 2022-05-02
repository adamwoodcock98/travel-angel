const mongoose = require("mongoose");

const transfersSchema = mongoose.Schema({
  pickupTime : {
    type : Date,
    required : true,
  },
  dropoffTime : {
    type : Date,
    required : true,
  },
  
});

const Transfer = mongoose.model("Transfer", userSchema);

module.exports = Transfer;