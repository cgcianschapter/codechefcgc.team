const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const middleware = require('../middleware/middleware');

/* GET events page1. */
router.get('/events/2019-20', function(req, res, next) {
  res.render('events1');
});

/* GET events page2. */
router.get('/events/2020-21', function(req, res, next) {
  res.render('events2');
});


/* GET events form */
router.get('/addevent', middleware.isLoggedIn, function(req, res, next){
  res.render('eventform');
});

/* GET upcoming events3 page. */
router.get('/upcoming_events', async function(req, res, next) {
  await Event.findOne({}).sort({_id: -1}).exec(function(err, event) {
		if(err) 
		{
			req.flash('error', err.message); 
		}	
		else
		{
      res.render('events3', { event: event } );
		}	
  });
});

/* POST  upcoming events3 page. */
router.post('/upcoming_events', async function(req, res, next) { 
  const nextEvent = {
    eventname: req.body.eventname,
    eventinfo: req.body.eventinfo,
    description: req.body.description,
    image: req.body.image
  }; 
  await Event.create(nextEvent, function(err){
    if(err) {
      req.flash('error', err.message);
    }
    else {
      req.flash('success', 'Event added Successfully !');
      res.redirect('/upcoming_events');
    }
  }); 
});

module.exports = router;