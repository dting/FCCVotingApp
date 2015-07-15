'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
  voter_id: String
});

var ChoiceSchema = new Schema({
  text: String,
  votes: [VoteSchema]
});

var PollSchema = new Schema({
  creator: String,
  text: String,
  choices: [ChoiceSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
