/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

User.find({}).remove(function() {
  var seedUser = new User({
    provider: 'local', name: 'Seed', email: 'seed@test.com', password: 'seed'
  });
  seedUser.save();
  var testUser = new User({
    provider: 'local', name: 'Test User', email: 'test@test.com', password: 'test'
  });
  testUser.save();
  var adminUser = new User({
    provider: 'local', role: 'admin', name: 'Admin', email: 'admin@admin.com', password: 'admin'
  });
  adminUser.save();
  console.log('finished populating users');

  Poll.find({}).remove(function() {
    Poll.create({
      creator: seedUser, text: 'Which soft drink do you prefer?', choices: [{text: 'Coke'}, {text: 'Sprite'}]
    }, {
      creator: seedUser,
      text: 'Who should I play in my flex spot?',
      choices: [{text: "Le'Veon Bell"}, {text: "Demarco Murray"}, {text: 'Odell Beckham Jr.'}]
    }, {
      creator: seedUser,
      text: 'What movie should I see first?',
      choices: [{text: 'Mad Max'}, {text: 'Terminator Genysis'}, {text: 'Inside Out'}, {text: 'Spy'}]
    }, {
      creator: testUser,
      text: 'Which phone should I buy?',
      choices: [{text: 'Apple IPhone'}, {text: 'Samsung S6'}, {text: 'HTC Nexus'}]
    }, {
      creator: testUser,
      text: 'poll5',
      choices: [{text: 'choice1'}, {text: 'choice2'}, {text: 'choice3'}, {text: 'choice4'}]
    }, {
      creator: adminUser, text: 'poll6', choices: [{text: 'choice1'}, {text: 'choice2'}]
    });
  });
});
