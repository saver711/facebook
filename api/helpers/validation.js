const User = require("../models/User");

exports.validateEmail = email =>{
    return String(email).toLocaleLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

exports.validateLength = (text, min, max) =>{
    return text.length >= min && text.length <= max;
}

exports.validateUsername = async username =>{
    userNameExists = false;
    do{
        let check = await User.findOne({username});
        
        if(check){
            username += (+new Date() * Math.random()).toString().substring(0, 1);
            userNameExists = true;
        } else{
            userNameExists = false;
        }
    }while(userNameExists);
    return username;
}