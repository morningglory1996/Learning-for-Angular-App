'use strict'

const { stringify } = require("querystring");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const ProductSchema = new Schema({
  // author: ObjectId,
  name: { type: String, required: true, max:(60, '最大60文字まで')},
  price: Number,
  description: String,
  heading1: String,
  heading2: String,
  heading3: String,
  headingText1: String,
  headingText2: String,
  headingText3: String,
  coverImage: String
});

module.exports = mongoose.model('Product', ProductSchema);