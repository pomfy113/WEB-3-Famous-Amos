const express = require('express');
const router = express.Router();

// let petJSON = require('../json/pets');
// let comments = require('../json/comments');
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

// TODO: Change petId to petId

// petId
router.get('/', (req, res) => {
    model.Pet.findAll().then(pets => {res.send(pets);});
});

// NEW
router.get('/new', (req, res) => {
  res.render('pets-new');
});


// SHOW
router.get('/:petId', (req, res) => {
  model.Pet.findById(req.params.petId, {
      include: {
          model: model.Comment,
      },
      order: [
          [ model.Comment, 'id', 'DESC']
      ]
  }).then(pet => {
      res.render('pets-show', { pet });
  });
});

// CREATE
router.post('/', (req, res) => {
    model.Pet.create(req.body);
    res.redirect('/');
});

// EDIT
router.get('/:petId/edit', (req, res) => {
    model.Pet.findById(req.params.petId).then(pet => {
        res.render('pets-edit', { pet });
    });
});

// UPDATE
router.put('/:petId', (req, res) => {
    model.Pet.findById(req.params.petId).then(pet => {
        return pet.update(req.body);
    }).then(() => {
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        res.send(err);
    });
});


// DESTROY
router.delete('/:petId', (req, res) => {
  model.Pet.findById(req.params.petId).then(pet => {
      return pet.destroy();
  }).then(() => {
      res.redirect('/');
  }).catch((err) => {
      res.send(err);
  });
});

module.exports = router;
