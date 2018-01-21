const express = require('express');
const router = express.Router({mergeParams: true});

let commentJSON = require('../json/comments')
const model = require('../db/models/');

// CREATE
router.post('/', (req, res) => {
    model.comment.create({
        body: req.body.body,
        PetId: req.params.PetId
    })

    res.redirect(`/pets/${req.params.id}`);
});

// DESTROY
router.delete('/:index', (req, res) => {
  res.redirect(`/pets/${req.params.id}`);
});

// Comment populate
router.get('/comment-populate', (req, res) => {
    let pet = model.Pet;
    let comment = model.Comment;

    comment.sync().then(function(){
        // Just add ALL of the comments, man.
        commentJSON.forEach(function(content){
            content.PetId = req.params.petId;
            comment.create(content);
        });
    }).then(() => {
        res.send("Population successful.");
    }).catch((err) => {
        res.send(err);
    });

});



module.exports = router;
