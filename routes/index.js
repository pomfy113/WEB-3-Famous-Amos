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

module.exports = router;
