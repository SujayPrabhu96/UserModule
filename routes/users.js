const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UsersController');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', UserController.listUsers);

router.get('/add', UserController.displayAddForm);

router.post('/add', upload.single('profile_image'),[
    body('email').isEmail(), //if valid email
    body('mobile_no').isInt(), //if mobile no. is valid integer
    body('gender').isIn(['male','female']) // if gender is male/female
], (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    UserController.createUser(req,res);
});

module.exports = router;
