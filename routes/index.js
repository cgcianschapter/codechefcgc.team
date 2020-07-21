const express = require('express'); 
const router = express.Router();
const Code = require('../models/code');
const middleware = require('../middleware/middleware');


/* GET home page. */
router.get('/', async function(req, res, next) {
  await Code.findOne({}).sort({_id: -1}).exec(function(err, data) {
		if(err) 
		{
			req.flash('error', err.message);
		}	
		else
		{
      //console.log(data);
      res.render('index', { data: data } );
		}	
  });
});

/* GET new form form page. */
router.get('/update', middleware.isLoggedIn, async function(req, res, next) {
  await Code.findOne({}).sort({_id: -1}).exec(function(err, data) {
    if(err)
    {
      req.flash('error', err.message);
      res.render('newForm',{req,res,data:{}});
    }
    else{
      res.render('newForm',{req,res,data:data});
    }
  })
});

/* POST update welcome page. */
router.post('/', async function(req, res, next) {
  const info = {
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    event: req.body.event,
    countdown:req.body.countdown,
    link: req.body.link
  }; 
  await Code.create(info, function(err){
    if(err) {
      req.flash('error', err.message);
    }
    else {
      req.flash('success', 'Page updated Successfully !');
      res.redirect('/');
    }
  });
});

module.exports = router;
