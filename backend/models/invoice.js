const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
require('@mongoosejs/double');

const invoiceSchema = new Schema({
  name: String,
  amount: { type: Schema.Types.Double, required: true },
  gst: { type: Schema.Types.Double, required: true},
  total_amount: { type: Schema.Types.Double, required: true},
  active: Boolean,
  createdBy: ObjectId,
  updatedBy: ObjectId
}, { versionKey: false });



module.exports = mongoose.model("invoice", invoiceSchema, "invoice");
