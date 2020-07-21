const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
   eventname: String,
   eventinfo: String,
   description: String,
   image: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;