'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  voter: {type: Schema.Types.ObjectId, ref: 'User'}
});

var ChoiceSchema = new Schema({
  text: String, votes: [VoteSchema]
});

var PollSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  creator_name: String,
  text: String,
  choices: [ChoiceSchema],
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Poll', PollSchema);
