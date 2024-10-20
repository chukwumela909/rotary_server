const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    investmentname: { type: String, required: true },
    targetinvestor: {type: String, required: true},
    targetcash: { type: String, required: true,},
    targetmultiple: { type: String, required: true},
    photo: {type: String, required: true}
  }
);

module.exports = mongoose.model('Plan', planSchema);