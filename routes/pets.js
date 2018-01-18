const express = require('express');
const router = express.Router();

let pets = require('../json/pets')
let comments = require('../json/comments')
const Pet =require('../db/models').Pet

// INDEX
router.get('/', (req, res) => {
  res.send(pets);
});

// NEW
router.get('/new', (req, res) => {
  res.render('pets-new');
});

// SHOW
router.get('/:index', (req, res) => {

  res.render('pets-show', { pet: pets[req.params.index], comments: comments });
});

// CREATE
router.post('/', (req, res) => {
    // pets.unshift(req.body);
    Pet.create(req.body)

    res.redirect('/');
});

// EDIT
router.get('/:index/edit', (req, res) => {
  res.render('pets-edit', { pet: pets[req.params.index]});
});

// UPDATE
router.put('/:index', (req, res) => {
  res.redirect(`/pets/${req.params.index}`)
});

// DESTROY
router.delete('/:index', (req, res) => {
  res.redirect('/');
});


module.exports = router;
