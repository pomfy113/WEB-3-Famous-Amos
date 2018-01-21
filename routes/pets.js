const express = require('express');
const router = express.Router();

let petJSON = require('../json/pets');
let comments = require('../json/comments');
const Pet = require('../db/models/').Pet;
const model = require('../db/models/');

// I'll deal with repopulation later
// router.get('/populate', (req, res) => {
//     const Testing =
//     model.sequelize.define('user', {
//       firstName: {
//         type: model.Sequelize.STRING
//       },
//       lastName: {
//         type: model.Sequelize.STRING
//       }
//     });
//
//     Testing.sync()
//     // sequelize model:create --name User --attributes first_name:string,last_name:string,bio:text
//
//     // for(let pet in pets){
//     //     pets[pet].id = pets[pet].id+1;
//     //     Pet.create(pets[pet]);
//     // }
//     // Pet.findAll().then(pets => {res.send(pets);});
//
//     res.redirect('/');
// });


// INDEX
router.get('/', (req, res) => {
    Pet.findAll().then(pets => {res.send(pets);});
});

// NEW
router.get('/new', (req, res) => {
  res.render('pets-new');
});


// SHOW
router.get('/:index', (req, res) => {
  Pet.findById(req.params.index, {
      include: [{
          model: model.Comment
      }]
  }).then(pet => {
      console.log(pet)
      res.render('pets-show', { pet, comments: comments });
  });
});

// CREATE
router.post('/', (req, res) => {
    Pet.create(req.body);
    res.redirect('/');
});

// EDIT
router.get('/:index/edit', (req, res) => {
    Pet.findById(req.params.index).then(pet => {
        res.render('pets-edit', { pet });
    });
});

// UPDATE
router.put('/:index', (req, res) => {
    Pet.findById(req.params.index).then(pet => {
        return pet.update(req.body);
    }).then(() => {
        res.redirect(`/pets/${req.params.index}`);
    }).catch((err) => {
        res.send(err);
    });
});


// DESTROY
router.delete('/:index', (req, res) => {
  res.redirect('/');
});

module.exports = router;
