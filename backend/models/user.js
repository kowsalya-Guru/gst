 const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const uniqueValidator = require("mongoose-unique-validator");
const autopopulate = require('mongoose-autopopulate');


const userSchema = new Schema({
  name: String,
  phone : { type:Number,required:true,unique:true},
  email: { type: String, required: true }, 
  password: { type: String, required: true }, 
  active: Boolean,
  createdBy: ObjectId,
  updatedBy: ObjectId
}, {versionKey: false});
userSchema.plugin(uniqueValidator, autopopulate);


module.exports = mongoose.model("user", userSchema, "user");
