const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
