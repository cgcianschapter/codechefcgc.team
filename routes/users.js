var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportLocalmongoose = require('passport-local-mongoose');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const nodemailer = require('nodemailer');
const User = require('../models/user');

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
router.post('/contact', function(req, res) {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });
  
    // Specify what the email will look like
    const mailOpts = {
      from: 'user', // This is ignored by Gmail
      to: 'absk.codechef@gmail.com',
      subject: req.body.subject,
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }
  
    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (err, response) => {
      if (err) {
        req.flash('error', err.message);  
        res.redirect('/contact') // Show a page indicating failure
      }
      else {
        req.flash('success', `Thank you! ${req.body.name}. Your message was sent. We will reach you as soon as possible.`);  
        res.redirect('/contact') // Show a page indicating success
      }
    });
});

module.exports = router;
