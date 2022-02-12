const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const uniqueValidator = require("mongoose-unique-validator");
const autopopulate = require('mongoose-autopopulate');


const loginschema = new Schema({

  email: { type: String }, 
  password: { type: String }, 
  active: Boolean,
  createdBy: ObjectId,
  updatedBy: ObjectId
}, {versionKey: false});
loginschema.plugin(uniqueValidator, autopopulate);


module.exports = mongoose.model("login", loginschema, "login");
