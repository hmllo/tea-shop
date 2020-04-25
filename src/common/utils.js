const utils = new Object();
const jwt = require('jsonwebtoken');
const secret = 'teashop';

utils.format = (value, type) => {
    let date, formatDate;
    if (value) date = new Date(value);
    else date = new Date();
    let o = {
        "YY": date.getFullYear(),
        "MM": date.getMonth() + 1, //月份 
        "DD": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds() //秒
    };
    if (type == 1) {
        formatDate = o.YY + "-" + (o.MM < 10 ? ('0' + o.MM) : o.MM) + "-" + (o.DD < 10 ? ('0' + o.DD) : o.DD) + " " + (o.h < 10 ? ('0' + o.h) : o.h) + ":" + (o.m < 10 ? ('0' + o.m) : o.m) + ":" + (o.s < 10 ? ('0' + o.s) : o.s)
    } else {
        formatDate = o.YY + "-" + (o.MM < 10 ? ('0' + o.MM) : o.MM) + "-" + (o.DD < 10 ? ('0' + o.DD) : o.DD)
    }
    return formatDate;
}

utils.trim = (value) => {
    return value.replace(/ /g, '');
}


utils.createToken = (userid, username, expires, strTimer) => {
    let token = jwt.sign({
        username,
        userid
    }, secret, {
        expiresIn: expires + " " + strTimer
    });
    return token;
}


utils.verifyToken = (_token) => {
    let verify = jwt.verify(_token, secret, (error, decoded) => {
        if(error) {
            return "Token Invalid";
        }
        return decoded;
    });
    return verify;
};

module.exports = utils;