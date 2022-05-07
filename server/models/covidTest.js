const mongoose = require("mongoose");

const covidTestSchema = mongoose.Schema({

});

const CovidTest = mongoose.model("CovidTest", covidTestSchema);

module.exports = CovidTest;