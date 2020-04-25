'use strict';
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
hash.update('123456');
let sha256Password = hash.digest('hex');
module.exports = {
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.bulkInsert('accounts', [
            {
                id: 1,
                username: "admin",
                password: sha256Password,
                name: "admin",
                phone: 13222222222,
                status: 1,
                roleId: -1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                username: "yangyang",
                password: sha256Password,
                name: "杨洋",
                phone: 13222222222,
                status: 1,
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('accounts');
    }
};