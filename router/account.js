const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {account,role} = require('../db/models');

// 账户列表
router.post('/list', async (req, res, next) => {
    try {
        let { page=1, name, phone, pageSize=10 } = req.body;
        let data;
        let limit = pageSize || 10;
        let offset = (page - 1) * pageSize;
        
        let where = {};
        if (name) where['name'] = {
            [Op.like]: '%' + name + '%'
        };
        if (phone) where['phone'] = {
            [Op.like]: '%' + phone + '%'
        };
        data = await account.findAndCountAll({
            order: [['createdAt', 'DESC']],
            where,
            offset,
            limit
        })
        res.json({
            code: 2000000,
            message: 'request ok',
            query: {
                page,
                name,
                phone,
                pageSize
            },
            data: {
                list: data.rows,
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

// 新增账户 编辑账户
router.post('/updata', async (req, res, next) => {
    try {
        let { id, nickname, password, name, phone } = req.body;
        let data, thatData;
        if (id) {
            //编辑
            thatData = await account.findOne({
                where: {
                    id
                }
            })
            if (thatData) {
                account = await thatData.updata({
                    nickname,
                    name,
                    phone: Number(phone)
                })
            }
        } else {
            //新增
            thatData = await account.findOne({
                where: {
                    nickname
                }
            })
            if(!thatData){
                data = await account.create({
                    nickname,
                    password,
                    name,
                    phone
                });
            }
        }
        res.json({
            code: 2000000,
            message: 'request ok',
            query: {
                id,
                nickname,
                password,
                name,
                phone
            },
            data: data
        })
    } catch (error) {
        next(error);
    }
})

// 禁用、启用账户
router.post('/status', async (req, res, next) => {
    try {
        let { id, status } = req.body;
        let data, thatData;
        thatData = await account.findOne({
            where: {
                id
            }
        })
        if (thatData && status != thatData.status) {
            data = await thatData.updata({
                status
            })
        }
        res.json({
            code: 2000000,
            message: 'request ok',
            query: {
                id,
                status
            },
            data: data
        })
    } catch (error) {
        next(error);
    }
})

// 修改密码
router.post('/password', async (req, res, next) => {
    try {
        let { id, password, new_password } = req.body;
        if (id) {
            // 系统账户修改
        } else {
            // 自己修改
        }
        let data, thatData;
        thatData = await account.findOne({
            where: {
                id,
                password
            }
        })
        if (thatData) {
            data = await thatData.updata({
                password: new_password
            })
        }
        res.json({
            code: 2000000,
            message: 'request ok',
            query: {
                id,
                password,
                new_password
            },
            data: data
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;