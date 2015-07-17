'use strict';

var _ = require('lodash');

var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find({})
    .sort('-created_at')
    .limit(10)
    .populate('creator', 'name')
    .lean()
    .exec(function (err, polls) {
      if(err) { return handleError(res, err); }
      _.each(polls, function(poll) {
        if (req.user) {
          var choice = _.find(poll.choices, {votes: [req.user.id]});
          if (choice) {
            poll.selected = choice._id;
          }
        }
        poll.totalVotes = _.sum(polls.choices, function(choice) {
          return choice.votes.length;
        });
      });
      return res.json(200, polls);
    });
};

// Get list of polls for user
exports.userIndex = function(req, res) {
  Poll.find({creator:req.params.id}).populate('creator', 'name').sort('-created_at').lean().exec(function (err, polls) {
    if(err) { return handleError(res, err); }
    _.each(polls, function(poll) {
      var choice = _.find(poll.choices, {votes:[req.params.id]});
      if (choice) {
        poll.selected = choice._id;
      }
    });
    console.log(polls);
    return res.json(200, polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id).populate('creator', 'name').lean().exec(function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    if (req.user) {
      poll.choices.forEach(function(choice) {
        if (choice.votes.indexOf(req.user.id) !== -1) {
          poll.selected = choice._id;
        }
      });
    }
    console.log(poll);
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.json(201, poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, poll);
    });
  });
};

function removeCurrentVote(choices, user) {
  var choice = _.find(choices, {votes:[user.id]});
  if (choice){
    choice.votes.pull(user.id);
  }
}

// Casts a vote for a choice.
exports.vote = function(req, res) {
  Poll.findById(req.params.id).populate('creator', 'name').exec(function(err, poll) {
    removeCurrentVote(poll.choices, req.user);
    var choice = _.find(poll.choices, {id:req.body.choice});
    choice.votes.push(req.user.id);
    poll.save();
    poll = poll.toObject();
    poll.selected = choice._id;
    return res.json(poll);
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
