const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const UserController = require('../Controllers/UsersController');
const { validationResult } = require('express-validator');
const validate = require('../helpers/validate');
const multer = require('multer');
var storage = multer.diskStorage({
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

//routes
router.get('/', UserController.listUsers);

router.get('/add', UserController.displayAddForm);

router.post('/add', upload.single('profile_image'), [validate()], (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    UserController.createUser(req,res);
});

router.get('/edit/:id', UserController.editUser);

router.post('/update/:id', upload.single('profile_image'), [validate()],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    UserController.updateUser(req,res);
});

router.get('/delete/:id', UserController.deleteUser);

module.exports = router;
