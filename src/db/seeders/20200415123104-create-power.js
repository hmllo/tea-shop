'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('powers', [
            {
                "id": 1,
                "path": "/",
                "name": "首页",
                "redirect": null,
                "component": "views/home/index.vue",
                "parentId": null,
                "sort": 1,
                "icon": "ico-caidan",
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 2,
                "path": null,
                "name": "系统管理",
                "redirect": null,
                "component": null,
                "parentId": null,
                "sort": 2,
                "icon": "ico-caidan",
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 3,
                "path": "/account",
                "name": "账户管理",
                "redirect": null,
                "component": "views/system/account.vue",
                "parentId": 2,
                "sort": 1,
                "icon": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 4,
                "path": "/role",
                "name": "角色管理",
                "redirect": null,
                "component": "views/system/role.vue",
                "parentId": 2,
                "sort": 2,
                "icon": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            },
            {
                "id": 5,
                "path": "/power",
                "name": "权限管理",
                "redirect": null,
                "component": "views/system/power.vue",
                "parentId": 2,
                "sort": 3,
                "icon": null,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ])

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('powers');
    }
};