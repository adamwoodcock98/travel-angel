const mongoose = "mongoose";

const vaccinationsSchema = new mongoose.schema({
  vaccinationStatus: {
    type: String,
    default: "Unvaccinated",
  },
  vaccineProof: [Buffer],
  additionalDocuments: [Buffer],
  vaccineDoses: [{
    dose: String,
    date: Date,
    type: String,
  }],
  user: {
    type: String,
    ref: "User",
    required: true,
  }
});

const Vaccinations = mongoose.model("Vaccinations", vaccinationsSchema);

module.exports = Parking;