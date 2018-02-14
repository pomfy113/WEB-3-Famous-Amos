const express = require('express');
const router = express.Router();

const model = require('../db/models/');

const multer  = require('multer');
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'uploads/');
  // },
  filename: function (req, file, cb) {
      // TODO Look into edge cases
      let extArray = file.mimetype.split("/");
      let ext = extArray[extArray.length - 1];
      cb(null, Date.now() + "." + ext);
  }
});

// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'some-bucket',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

const upload = multer({ storage });
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
    let imageArray = ['picThumb', 'picUrl', 'picSquare', 'picMobile'];
    // res.send(req.file)

    if (req.file) {
      client.upload(req.file.path, {}, function (err, versions, meta) {
        if (err) {
            console.log(err);
            return res.status(400).send({ err: err });
        }

        for(let i = 0; i < imageArray.length; i++){
            newPet[imageArray[i]] = versions[i].url;
        }

        model.Pet.create(newPet).then(() => {
            req.flash('success', 'Pet created');
            res.redirect('/');
        });
    });

    }
    else{
        model.Pet.create(newPet).then(() => {
            req.flash('success', 'Pet created, but images cannot be uploaded');
            res.redirect('/');
        });
    }

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
