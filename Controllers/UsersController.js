const User = require('../models/User');
const http = require('http');
const fs = require('fs');
const csv = require('fast-csv');
const Validation = require('../helpers/validate');

const listUsers = (req, res) => {
    User.findAll({
        attributes: ['id', 'name', 'email', 'dob', 'gender', 'mobile_number']
    })
    .then(users => {
        res.render('users/index', {data: users});
    })
    .catch(error => res.render('users/index', {error: error}));


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
        { where: { id: req.params.id } }
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
     .then(user => res.redirect('/'))
     .catch(error => res.render('users/index', {error: error}));

};

const renderImport = (req, res) => {
    res.render('users/import', {
        title: 'Import User(s)'
    });
};

const createUserWithCSV = (data) => {
    let promises = [];
    for (let id in data) {
        let user = {
            name: data[id][0],
            email: data[id][1],
            dob: data[id][2].split('/').reverse().join('-'),
            gender: data[id][3],
            mobile_no: data[id][4],
            address: data[id][5]
        };
        let newPromise = User.create({ 'name': user.name, 'email': user.email, 'dob': user.dob, 'gender': user.gender, 'mobile_number': user.mobile_no, 'address': user.address });
        promises.push(newPromise);
    }
    return Promise.all(promises);
};

const uploadCsv = (req, res) => {
    const fileRows = [];
    csv.parseFile(req.file.path)
        .on("data", (data) => fileRows.push(data))
        .on("end", () => {
            fileRows.shift();  //removes header row
            const validationError = Validation.validateCsvData(fileRows);
            if (validationError) {
                res.render('users/index', {error: validationError});
            }
            createUserWithCSV(fileRows)
                .then(users => {
                    fs.unlinkSync(req.file.path); //deletes file from uploads/temp
                    res.redirect('/users/');
                });
        });
};

module.exports.listUsers = listUsers;
module.exports.displayAddForm = displayAddForm;
module.exports.createUser = createUser;
module.exports.editUser = editUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.renderImport = renderImport;
module.exports.uploadCsv = uploadCsv;
