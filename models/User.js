const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.TEXT
        },
        profile_image: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false
    }
)