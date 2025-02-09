const validator = require("validator");

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("First Name or Last Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong password");
    }
}

module.exports = {validateSignupData};