const express = require('express');
const router = express.Router();

const pets = require('../json/pets');
const model = require('../db/models/');

/* GET home page. */
router.get('/', (req, res) => {
    // req.flash('info', 'Welcome');
    model.Pet.findAll().then(pets => {
        res.render('pets-index', { pets });
    });

});

router.get('/page/:page', (req, res) => {
  let limit = 3;   // number of records per page
  let offset = 0;

  model.Pet.findAndCountAll().then((data) => {
    let page = req.params.page;      // page number
    let pages = Math.ceil(data.count / limit);
		offset = limit * (page - 1);

    model.Pet.findAll({
      limit: limit,
      offset: offset,
      $sort: { id: 1 }
    }).then((pets) => {
        console.log(pages)
        res.render('pets-index', {pets, count: data.count, pages});
    });
  })
  .catch(function (error) {
		res.status(500).send('Internal Server Error');
	});
});

router.get('/search', (req, res) => {
    console.log("Hello!", req.query.name)
    model.Pet.findAll(
        {
            where: {
                name: req.query.name
            }
        }
    ).then(pets => {
        res.render('pets-index', { pets });
    });

});

module.exports = router;
