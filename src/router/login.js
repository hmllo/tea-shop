const express = require('express');
const router = express.Router();
const { account } = require('../db/models');
const svgCaptcha = require('svg-captcha');
const crypto = require('crypto');
const { createToken } = require('../common/utils');

router.post('/captcha', async (req, res, next) => {
    try {
        var codeConfig = {
            mathMin: 1,
            mathMax: 9,
            mathOperator: '+-'
        }
        var captcha = svgCaptcha.createMathExpr(codeConfig);
        req.session.captcha = captcha.text.toLowerCase();
        res.json({
            code: 2000000,
            data: captcha.data
        });
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let { username, password, code } = req.body;
        if (code == req.session.captcha) {
            let sha256Password = crypto.createHash('sha256').update(password).digest('hex');
            let data;
            data = await account.findOne({
                where: {
                    username: username,
                    password: sha256Password,
                    status: 1
                }
            })
            if (data) {
                // let serverToken = createToken(data.id, data.username, "7", "days");
                let localToken = createToken(data.id, data.username, "2", "hours");
                req.session.userid = data.id;
                req.session.username = data.username;
                res.json({
                    code: 2000000,
                    data: {
                        token: localToken,
                        user: data
                    }
                });
            }else{
                res.json({
                    code: 4100201
                });
            }
        } else {
            res.json({
                code: 4100101
            });
        }

    } catch (error) {
        next(error)
    }

})

router.post('/checkLogin', async (req, res, next) => {
    try {



    } catch (error) {
        next(error)
    }

})

module.exports = router;