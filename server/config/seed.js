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
      creator: seedUser,
      creator_name: seedUser.name,
      text: 'Which soft drink do you prefer?',
      choices: [{text: 'Coke'}, {text: 'Sprite'}],
      created_at: Date.now()
    }, {
      creator: seedUser,
      creator_name: seedUser.name,
      text: 'Who should I play in my flex spot?',
      choices: [{text: "Le'Veon Bell"}, {text: "Demarco Murray"}, {text: 'Odell Beckham Jr.'}],
      created_at: Date.now()
    }, {
      creator: seedUser,
      creator_name: seedUser.name,
      text: 'What movie should I see first?',
      choices: [{text: 'Mad Max'}, {text: 'Terminator Genysis'}, {text: 'Inside Out'}, {text: 'Spy'}],
      created_at: Date.now()
    }, {
      creator: testUser,
      creator_name: testUser.name,
      text: 'Which phone should I buy?',
      choices: [{text: 'Apple IPhone'}, {text: 'Samsung S6'}, {text: 'HTC Nexus'}],
      created_at: Date.now()
    }, {
      creator: testUser,
      creator_name: testUser.name,
      text: 'Which superhero would win in a fight?',
      choices: [{text: 'Superman'}, {text: 'Batman'}, {text: 'Deadpool'}, {text: 'choice4'}],
      created_at: Date.now()
    }, {
      creator: adminUser,
      creator_name: adminUser.name,
      text: 'Which programming language should I learn?',
      choices: [{text: 'Python'}, {text: 'Javascript'}],
      created_at: Date.now()
    });
  });
});
