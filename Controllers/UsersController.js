const User = require('../models/User');

const listUsers = (req, res) => {
    User.findAll({
        attributes: ['name','email','dob','gender','mobile_number']
    })
    .then(users => {
        res.render('users/index', {data: users});
    })
    .catch(error => res.json('error: ' + err));

};

const displayAddForm = (req, res) => {
    res.render('users/add', {
        title: 'Add User'
    });
};

const createUser = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        dob: (req.body.dob).split('.').reverse().join('-'),
        gender: req.body.gender,
        mobile_number: req.body.mobile_no,
        address: req.body.address,
        profile_image: req.file.originalname
    })
        .then(user => res.redirect('/'))
        .catch(err => res.json('error: ' + err))
};
module.exports.listUsers = listUsers;
module.exports.displayAddForm = displayAddForm;
module.exports.createUser = createUser;
