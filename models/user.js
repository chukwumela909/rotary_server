const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const babySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  motherName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  babyPicture: { type: String },
  immunizationCard: { type: String },
  votes: {type: String, default: "0", required: true},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Baby", babySchema);