const { body } = require('express-validator');

module.exports =  function(){
    return [
        body('name').notEmpty().trim().escape(),            //if name is empty & trim 
        body('email').isEmail().normalizeEmail(),           //if valid email
        body('mobile_no').isInt(),                          //if mobile no. is valid integer
        body('gender').isIn(['male','female']),             // if gender is male/female
        body('dob').notEmpty().trim(),                      //if dob is empty & trim
        body('address').notEmpty().trim().escape()          //if address is empty & trim
    ];
};