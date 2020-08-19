const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  link: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;