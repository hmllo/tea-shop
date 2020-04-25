const express = require('express');
const router = express.Router();
const { role } = require('../db/models');
const {trim,format} = require('../common/utils');


router.post('/list', async (req, res, next) => {
    try {
        let data;
        data = await role.findAll();
        let oList = JSON.parse(JSON.stringify(data));
        let list = oList.map(e=>{
            e.updatedAt = format(e.updatedAt);
            e.createdAt = format(e.createdAt);
            return e;
        })
        res.json({
            code: 2000000,
            data: {
                list
            }
        })
        
    } catch (error) {
        next(error);
    }
})

let req_name = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/;
let req_description = /^[\u4E00-\u9FA5A-Za-z]{0,200}$/;
// 4090201	未找到该角色
// 4090202	角色名称为空
// 4090203	角色名称格式不正确
// 4090204	角色描述格式不正确

// 新增角色
router.post('/updata', async (req, res, next) => {
    try {
        let name = trim(req.body.name);
            description = trim(req.body.description);

        let statusCode = 2000000;

        if(!name) statusCode = 4090202;
        if(!req_name.test(name)) statusCode = 4090203;
        if(!req_description.test(description)) statusCode = 4090204;

        if(statusCode != 2000000){
            return res.json({
                code: statusCode
            })
        }
        let data = await role.create({
            name,
            description
        });
        res.json({
            code: statusCode,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

module.exports =  router;