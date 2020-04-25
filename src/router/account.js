const express = require('express');
const router = express.Router();
const { account, role } = require('../db/models');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const {trim,format} = require('../common/utils');

// 账户列表
router.post('/list', async (req, res, next) => {
    try {
        let { page = 1, name, phone, pageSize = 10 } = req.body;
        let data;
        let limit = pageSize || 10;
        let offset = (page - 1) * pageSize;
        let where = {};
        // if (name) where['name'] = {
        //     [Op.like]: '%' + name + '%'
        // };
        // if (phone) where['phone'] = {
        //     [Op.like]: '%' + phone + '%'
        // };
        data = await account.findAndCountAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']],
            where,
            offset,
            limit,
            include: {
                model: role, 
                as: 'role',
                attributes: ['name']
            }
        })
        let oList = JSON.parse(JSON.stringify(data.rows));
        let list = oList.map(e=>{
            e.updatedAt = format(e.updatedAt);
            e.createdAt = format(e.createdAt);
            return e;
        })
        res.json({
            code: 2000000,
            data: {
                list,
                page: {
                    pageSize,
                    currentPage: page,
                    total: data.count
                }
            }
        })
        
    } catch (error) {
        next(error);
    }
})

// 4090101	未找到该账户
// 4090102	用户名为空
// 4090103	用户名格式不正确
// 4090104	密码为空
// 4090105	密码格式不正确
// 4090106	密码不一致
// 4090107	姓名格式不正确
// 4090108	手机格式不正确
// 4090109	状态码无效
// 4090110	用户名重复

let req_username = /^[a-z]{4,18}$/;
let req_password = /^[a-zA-Z]\w{5,17}$/;
let req_name = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/;
let req_phone = /^(1[3-8])\d{9}$/;
// 新增账户
router.post('/updata', async (req, res, next) => {
    try {
        let username = trim(req.body.username),
            password = trim(req.body.password),
            name = trim(req.body.name),
            phone = trim(req.body.phone);

        let statusCode = 2000000;

        if(!username) statusCode = 4090102;
        if(!req_username.test(username)) statusCode = 4090103;
        if(!password) statusCode = 4090104;
        if(!req_password.test(password)) statusCode = 4090105;
        if(name&&!req_name.test(name)) statusCode = 4090107;
        if(phone&&!req_phone.test(phone)) statusCode = 4090108;

        if(statusCode != 2000000){
            return res.json({
                code: statusCode
            })
        }

        let data, thatData;
        thatData = await account.findOne({
            attributes: { exclude: ['password'] },
            where: {
                username
            }
        })
        if (!thatData) {
            hash.update(password);
            let sha256Password = hash.digest('hex');
            data = await account.create({
                username,
                password:sha256Password,
                name,
                phone
            });
        }else{
            return res.json({
                code: 4090110
            })
        }
        res.json({
            code: statusCode,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

// 编辑账户
router.post('/edit', async (req, res, next) => {
    try {
        let id = Number(req.body.id),
            name = trim(req.body.name),
            phone = trim(req.body.phone);

        let statusCode = 2000000;
        if(name&&!req_name.test(name)) statusCode = 4090107;
        if(phone&&!req_phone.test(phone)) statusCode = 4090108;

        if(statusCode != 2000000){
            return res.json({
                code: statusCode
            })
        }


        let data, thatData;
        thatData = await account.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id
            }
        })
        if (thatData) {
            data = await thatData.update({
                name,
                phone
            })
        }else{
            return res.json({
                code: 4090101
            })
        }
       
        res.json({
            code: statusCode,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

// 禁用、启用账户
router.post('/status', async (req, res, next) => {
    try {
        let id = Number(req.body.id),
            status = req.body.status == "1" ? 1 : 0;
        let data, thatData;
        thatData = await account.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id
            }
        })
        if(status == thatData.status){
            return res.json({
                code: 4090109
            })
        }
        if (thatData) {
            data = await thatData.update({
                status
            })
        }else{
            return res.json({
                code: 4090101
            })
        }
        res.json({
            code: 2000000,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

// 修改密码
router.post('/password', async (req, res, next) => {
    try {
        let password = trim(req.body.password);
        let id,new_password,where;
        let statusCode = 2000000;
        if(req.body.new_password == undefined){
            // 系统账户修改
            id = Number(req.body.id);
            where = {id};
        }
        if(req.body.id == undefined){
            // 自己修改
            id = Number(req.session.userid);
            new_password = trim(req.body.new_password);
            if(!new_password) statusCode = 4090104;
            if(!req_password.test(new_password)) statusCode = 4090105;
            if(password != new_password) statusCode=4090106;
            hash.update(password);
            let sha256Password = hash.digest('hex');
            where = {
                id,
                password: sha256Password
            };
        }


        if(statusCode != 2000000){
            return res.json({
                code: statusCode
            })
        }
        
        let data, thatData;
        thatData = await account.findOne({
            where
        })
        hash.update(new_password==undefined?password:new_password);
        let sha256Password = hash.digest('hex');
        if (thatData) {
            data = await thatData.update({
                password: sha256Password
            })
        }else{
            return res.json({
                code: 4090101
            })
        }
        res.json({
            code: statusCode,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

// 修改账户角色
router.post('/role', async (req, res, next) => {
    try {
        let id = Number(req.body.id),
            roleId = Number(req.body.roleId);
        let data, thatData, roleData;
        thatData = await account.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id
            }
        })
        roleData = await role.findOne({
            where: {
                id:roleId
            }
        })
        if(!roleData) {
            return res.json({
                code: 4090201
            })
        }
        if (thatData) {
            data = await thatData.update({
                roleId: roleData.id
            })
        }else{
            return res.json({
                code: 4090101
            })
        }
        res.json({
            code: 2000000,
            data: data
        })
        
    } catch (error) {
        next(error);
    }
})

module.exports = router;