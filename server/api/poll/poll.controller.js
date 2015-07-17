'use strict';

var _ = require('lodash');

var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find({}).sort('-created_at').limit(10).populate('creator', 'name').lean().exec(function(err, polls) {
    if (err) {
      return handleError(res, err);
    }
    _.each(polls, function(poll) {
      if (req.user) {
        poll.selected = _.result(_.find(poll.choices, {votes: [req.user.id]}), '_id');
      }
      poll.totalVotes = _.sum(poll.choices, _.property('votes.length'));
    });
    return res.json(200, polls);
  });
};

// Get list of polls for user
exports.userIndex = function(req, res) {
  Poll.find({creator: req.params.id}).sort('-created_at').populate('creator', 'name').lean().exec(function(err, polls) {
      if (err) { return handleError(res, err); }
      _.each(polls, function(poll) {
        if (req.user) {
          poll.selected = _.result(_.find(poll.choices, {votes: [req.user.id]}), '_id');
        }
        poll.totalVotes = _.sum(poll.choices, _.property('votes.length'));
      });
      console.log(polls);
      return res.json(200, polls);
    });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id).populate('creator', 'name').lean().exec(function(err, poll) {
    if (err) { return handleError(res, err); }
    if (!poll) { return res.send(404); }
    if (req.user) {
      poll.selected = _.result(_.find(poll.choices, {votes: [req.user.id]}), '_id');
    }
    poll.totalVotes = _.sum(poll.choices, _.property('votes.length'));
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.send(404);
    }
    var updated = _.merge(poll, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, poll);
    });
  });
};

// Casts a vote for a choice.
exports.vote = function(req, res) {
  Poll.findById(req.params.id).populate('creator', 'name').exec(function(err, poll) {
    // Remove current vote.
    var currentVote = _.find(poll.choices, {votes: [req.user.id]});
    if (currentVote) {
      currentVote.votes.pull(req.user.id);
    }
    if (req.body.choice) {
      // Cast new vote.
      _.find(poll.choices, {id: req.body.choice}).votes.push(req.user.id);
    }
    poll.save();
    poll = poll.toObject();
    poll.selected = req.body.choice;
    poll.totalVotes = _.sum(poll.choices, _.property('votes.length'));
    return res.json(poll);
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.send(404);
    }
    poll.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
