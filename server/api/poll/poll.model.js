'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
  text: {type: String, required: true},
  votes: [String]
});

var PollSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  text: {type:String, required: true},
  choices: [ChoiceSchema],
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Poll', PollSchema);
