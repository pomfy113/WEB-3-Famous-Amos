const express = require('express');
const router = express.Router({mergeParams: true});

let commentJSON = require('../json/comments');
const model = require('../db/models/');

// CREATE
router.post('/', (req, res) => {
    model.Comment.create({
        content: req.body.content,
        PetId: req.params.petId
    }).then(() => {
        req.flash('info', 'Comment posted');
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        req.flash('info', 'Something went wrong!');
        res.redirect(`/pets/${req.params.petId}`);
    });
});

// DESTROY
// TODO - Look into more individual deletes
router.delete('/:index', (req, res) => {
    model.Comment.destroy({
        where: {
            id: req.params.index
        }
    }).then(() => {
        req.flash('info', 'Comment deleted');
        res.redirect(`/pets/${req.params.petId}`);
    }).catch((err) => {
        req.flash('info', 'Something went wrong!');
        res.redirect(`/pets/${req.params.petId}`);
    });

});

// Comment populate
router.get('/comment-populate', (req, res) => {
    const Pet = model.Pet;
    const Comment = model.Comment;

    Comment.sync().then(function(){
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
