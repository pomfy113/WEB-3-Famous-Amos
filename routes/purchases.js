const express = require('express');
const router = express.Router();

let pets = require('../json/pets');
let comments = require('../json/comments');

// NEW
router.get('/pets/:petId/purchase', (req, res) => {
  console.log('Here is the petId: ', req.params.petId);
  res.render('purchase-new', { pet: pets[req.params.petId]});
});


module.exports = router;
