const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
   first: String,
   second: String,
   third: String,
   event: String,
   countdown: String,
   link: String
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;