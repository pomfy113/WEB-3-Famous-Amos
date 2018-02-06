const express = require('express');
const router = express.Router();

// let petJSON = require('../json/pets');
// let comments = require('../json/comments');
const model = require('../db/models/');

const multer  = require('multer')
const upload = multer({ dest: '../uploads/' })
const Upload = require('s3-uploader');

let client = new Upload(process.env.S3_BUCKET, {
  aws: {
    path: 'posts/coverImg/',
    region: process.env.S3_REGION,
    acl: 'public-read',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  cleanup: {
    versions: true,
    original: true
  },
  versions: [{
    maxWidth: 320,
    aspect: '1.618:1',
    suffix: '-thumbnail'
  },{
    maxWidth: 1000,
    aspect: '2.414:1', //silver ratio
    suffix: '-desktop'
  },{
    maxWidth: 320,
    aspect: '2.414:1', //silver ratio
    suffix: '-mobile'
  },{
    maxWidth: 100,
    aspect: '1:1',
    suffix: '-square'
  }]
});

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
router.post('/', upload.single('picUrl'), (req, res) => {
    let newPet = req.body;

    if (req.file) {
      client.upload(req.file.path, {}, function (err, versions, meta) {
        if (err) {
            console.log(err)
            return res.status(400).send({ err: err }); }

        versions.forEach(function(image) {
          console.log(image.width, image.height, image.url);
          // 1024 760 https://my-bucket.s3.amazonaws.com/path/110ec58a-a0f2-4ac4-8393-c866d813b8d1.jpg

        //   var urlArray = image.url.split('-');
        //   urlArray.pop();
        //   var url = urlArray.join('-');
        //   newPet.picUrl = url;
        //   newPet.save();
        });

        res.send({ newPet });
      });
    } else {
      res.send({ newPet });
    }

    // model.Pet.create(newPet);

    // res.redirect('/');
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


module.exports = router;
