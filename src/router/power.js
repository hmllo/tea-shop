const express = require('express');
const router = express.Router();
const { power, role, role_power } = require('../db/models');
const qs = require('qs')
// 权限列表
router.post('/list', async (req, res, next) => {
    try {
        let roleId = Number(req.body.roleId);
        let powerData, role_powerData;
        if (roleId && roleId!=-1) {
            role_powerData = await role_power.findAll({
                where: {
                    roleId
                }
            });
        }
        role_powerData = role_powerData ? JSON.parse(JSON.stringify(role_powerData)) : [];

        powerData = await power.findAll({
            order: [['sort', 'DESC']]
        });


        let oList = JSON.parse(JSON.stringify(powerData));

        let list = oList.map(e => {
            e["checked"] = roleId==-1?true:false;

            if (roleId && roleId!=-1) {

                role_powerData.map(item => {
                    if (e.id == item.powerId) {
                        e["checked"] = true;
                    }
                })
            }
            return e
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

// 权限列表
router.post('/updata', async (req, res, next) => {
    try {
        let {path,name,redirect,component,parentId,sort,icon} = req.body;
        
        
        await power.create({
            path: path || null,
            name: name || null,
            redirect: redirect || null,
            component: component || null,
            icon: icon || null,
            parentId:Number(parentId) || null,
            sort:Number(sort)
        });
        res.json({
            code: 2000000
        })

    } catch (error) {
        next(error);
    }
})

// 权限列表
router.post('/role/save', async (req, res, next) => {
    try {
        let body = qs.parse(req.body),
            roleId = Number(body.roleId),
            ids = body.ids;

        await role_power.destroy({
            where: {
                roleId 
            }
        })
        await role_power.bulkCreate(ids.map(e=>{
            return{
                roleId,
                powerId: Number(e)
            }
        }))


        res.json({
            code: 2000000
        })

    } catch (error) {
        next(error);
    }
})

module.exports = router;