const User = require('../models/User');

const listUsers = (req, res) => {
    User.findAll({
        attributes: ['id','name','email','dob','gender','mobile_number']
    })
    .then(users => {
        res.render('users/index', {data: users});
    })
    .catch(err => res.json(err));

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
        .then(user => res.redirect('/users/'))
        .catch(err => res.json('error: ' + err))
};

const deleteUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result=> res.redirect('/users/'))
    .catch(err => res.json('error: '+ err))
};

module.exports.listUsers = listUsers;
module.exports.displayAddForm = displayAddForm;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
