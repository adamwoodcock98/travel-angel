const mongoose = require("mongoose");

const vaccinationsSchema = mongoose.Schema({
  vaccinationStatus: {
    type: String,
    default: "Unvaccinated",
  },
  vaccineProof: [Buffer],
  additionalDocuments: [Buffer],
  vaccineDoses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaccineDose",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
  ],
});

const Vaccinations = mongoose.model("Vaccinations", vaccinationsSchema);

module.exports = Vaccinations;
