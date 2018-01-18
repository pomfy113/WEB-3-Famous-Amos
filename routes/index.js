const express = require('express');
const router = express.Router();

const pets = require('../json/pets')
const Pet = require('../db/models/').Pet

/* GET home page. */
router.get('/', (req, res) => {
    Pet.findAll().then(pets => {
        res.render('pets-index', { pets });
    })
});

module.exports = router;
