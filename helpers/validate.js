const { body } = require('express-validator');

const validate = () => {
    return [
        body('name').notEmpty().trim().escape(),            //if name is empty & trim 
        body('email').isEmail().normalizeEmail(),           //if valid email
        body('mobile_no').isInt(),                          //if mobile no. is valid integer
        body('gender').isIn(['male','female']),             // if gender is male/female
        body('dob').notEmpty().trim(),                      //if dob is empty & trim
        body('address').notEmpty().trim().escape()          //if address is empty & trim
    ];
};

const validateCsvRow = (row_data) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!row_data[0])
        return "Invalid Name";
    if(reg.test(row_data[1]) == false)
        return "Invalid Email Address";
    if(row_data[3] != 'male' && row_data[3] != 'female')
        return "Invalid Gender";
    if(!/^[0-9]+$/.test(row_data[4]))
        return "Invalid Mobile Number";
};

const validateCsvData = (rows) => {
    for(let id in rows){
        const rowError = validateCsvRow(rows[id]);
        if(rowError){
            return rowError+" on row "+ (Number(id) + 1);
        }
    }
    return false;
};

module.exports.validate = validate;
module.exports.validateCsvData = validateCsvData;