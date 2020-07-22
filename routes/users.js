var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportLocalmongoose = require('passport-local-mongoose');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//SHOW register form
router.get("/register", function(req, res){
    //res.render("user/register");
    res.send('404 NOT FOUND');;
});

//Handle SIGN UP logic
router.post('/register', function(req, res){
	var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username
  });
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash('error', err.message);
			return res.render('user/register');
		}
		passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome Admin');
			res.redirect('/')
		});
	});
});

//ROUTE to show login form
router.get('/login', function(req, res){
    res.render('user/login');
});

//ROUTE handling login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    faliureFlash: true,
    successFlash: 'Welcome Admin !'
}));

//ROUTE to logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'See you later Admin !');
    res.redirect('/');
});

//ROUTE to get contact form
router.get('/contact', function(req, res, next) {
    res.render('contact');
});

// POST route from contact form
router.post('/contact', async function(req, res) {
  const msg = {
    to: 'codechef.cgcianschapter@gmail.com',
    from: 'codechef.cgcianschapter@gmail.com',
    subject: req.body.subject,
    text: `A query has been submitted by ${req.body.name}(${req.body.email}) Ph no.- ${req.body.number} - ${req.body.message}`
  }
  try {
    await sgMail.send(msg);
    req.flash('success', 'Thank you, your message was sent. We will get back to you shortly!');
    res.redirect('/contact');
  }
  catch(err) {
    req.flash('error', 'Oops, Something went wrong. Please try again later!');
    res.redirect('/contact');
  }
});

module.exports = router;
