const express = require('express');
const shortid = require('shortid');
const { validationResult } = require('express-validator');
const multer = require('multer');
const router = express.Router();
const UserController = require('../Controllers/UsersController');
const Validation = require('../helpers/validate');

//storage for uploading profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let id = shortid.generate();
        let img = file.originalname;
      cb(null, `${id}.${img}`);
    }
});
const upload = multer({ storage: storage });

//storage for importing csv file
const storage_csv = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/temp/')
    },
    filename: function (req, file, cb) {
        let id = shortid.generate();
        let img = file.originalname;
      cb(null, `${id}.${img}`);
    }
});
const upload_csv= multer({ storage: storage_csv });


//routes
router.get('/', UserController.listUsers);

router.get('/add', UserController.displayAddForm);

router.post('/add', upload.single('profile_image'), [Validation.validate()], (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    UserController.createUser(req,res);
});

router.get('/edit/:id', UserController.editUser);

router.post('/update/:id', upload.single('profile_image'), [Validation.validate()],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    UserController.updateUser(req,res);
});

router.get('/delete/:id', UserController.deleteUser);

router.get('/import', UserController.renderImport);

router.post('/upload-csv', upload_csv.single('csv_file'), UserController.uploadCsv);

module.exports = router;
