const User = require('../models/User');

const listUsers = (req, res) => {
    User.findAll({
        attributes: ['id', 'name', 'email', 'dob', 'gender', 'mobile_number']
    })
        .then(users => {
            res.render('users/index', { data: users });
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
        profile_image: req.file.filename
    })
        .then(user => res.redirect('/users/'))
        .catch(err => res.json('error: ' + err))
};

const editUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            res.render('users/edit', {
                data: user,
                title: 'Edit User'
            })
        })
        .catch(error => res.render('users/index', {error: error}));
};

const updateUser = (req, res) => {
    User.update(
        {
            name: req.body.name,
            email: req.body.email,
            dob: (req.body.dob).split('.').reverse().join('-'),
            gender: req.body.gender,
            mobile_number: req.body.mobile_no,
            address: req.body.address,
            profile_image: (req.file === undefined) ? req.body.added_image : req.file.filename
        },
        { where: {id: req.params.id }}
    )
        .then(user => res.redirect('/users/'))
        .catch(error => res.render('users/index', {error: error}));
};

const deleteUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(result => res.redirect('/users/'))
        .catch(err => res.json('error: ' + err))
};

module.exports.listUsers = listUsers;
module.exports.displayAddForm = displayAddForm;
module.exports.createUser = createUser;
module.exports.editUser = editUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
