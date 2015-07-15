'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  voter: {type: Schema.Types.ObjectId, ref: 'User'}
});

var ChoiceSchema = new Schema({
  text: String,
  votes: [VoteSchema]
});

var PollSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  choices: [ChoiceSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
