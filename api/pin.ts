"use strict";
import mongoose = require('mongoose');

let PinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  iguser: { type: String },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }]
})

export let Pin = mongoose.model('Pin', PinSchema);
