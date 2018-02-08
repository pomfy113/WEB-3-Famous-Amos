const express = require('express');
const router = express.Router();

const pets = require('../json/pets');
const model = require('../db/models/');

const emailService = require('./email');

/* GET home page. */
// TODO - Flash Messages on error messages
router.get('/', (req, res) => {
    let limit = 3;   // number of records per page
    let offset = 0;
    let searchQuery = {};

    // If you have a search query, actually do something
    if(req.query.search){
        searchQuery = {
            $or: [ { name: { $iLike: "%" + req.query.search + "%" } },
			       { species: { $iLike: "%" + req.query.search + "%" } },
                   { description: { $iLike: "%" + req.query.search + "%" } },
                ]
            };
    }

    model.Pet.findAndCountAll({where: searchQuery}).then((data) => {
      let page = req.query.page;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      model.Pet.findAll({
        where: searchQuery,
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
      }).then((pets) => {
          res.render('pets-index', {pets, count: data.count, search: req.query.search, pages});
      });
    })
    .catch(function (error) {
  		res.status(500).send('Internal Server Error');
  	});

});

router.get('/testing', (req, res) => {
    let nodemailer = require('nodemailer');
    let mg = require('nodemailer-mailgun-transport');

    // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
    let auth = {
      auth: {
        api_key: process.env.MAILGUN_ACTIVE_API_KEY,
        domain: process.env.DOMAIN
      }
    };

    let nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
      from: 'pomfy113@gmail.com',
      to: 'pomfy113@gmail.com', // An array if you have multiple recipients.
      subject: 'Hey you, awesome!',
      text: 'Mailgun rocks, pow pow!',
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Response: ' + info);
      }
    });



});

module.exports = router;
