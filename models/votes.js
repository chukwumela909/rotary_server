const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const voteSchema = new Schema(
  {
    voterName: { type: String, required: true },
    voterEmail: {type: String, required: true},
    amount: { type: String, required: true,},
    receipt: { type: String, required: true},
    vote: { type: String, required: true },
    babyName: { type: String, required: true },
    motherName: { type: String, required: true },
    babyphoto:  { type: String, required: true },
    date: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('Vote', voteSchema);