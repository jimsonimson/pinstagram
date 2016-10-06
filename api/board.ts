"use strict";
import mongoose = require('mongoose');

let BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }]
})

export let Board = mongoose.model('Board', BoardSchema);
