const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  file: {
    type: Buffer,
    required: true,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
