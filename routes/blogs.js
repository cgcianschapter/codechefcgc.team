const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const middleware = require('../middleware/middleware');

/* GET new blog form */
router.get('/blogs/new', middleware.isLoggedIn, function(req, res) {
    res.render('newBlog');
});

/** GET Show all Blogs  */
router.get('/ourblogs', async function(req, res) {
    await Blog.find({}, function(err, info) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
        }
        else {
            res.render('blog', { info });
        }
    });
});

/** POST Create new Blogs */
router.post('/blogs', async function(req, res) {
    await Blog.create(req.body, function(err, info) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
        }
        else {
            req.flash('success', 'Blog added Successfully !');
            res.redirect('/ourblogs');
        }
    });
});

/** DELETE remove blog */
router.post('/blogs/:id', async function(req, res) {
    await Blog.findOneAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
            req.flash('error', err.message);
        }
        else {
            req.flash('error', err.message);
            res.redirect('/ourblogs');
        }
    });
});

module.exports = router;