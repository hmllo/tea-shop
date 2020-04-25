'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                "id": 1,
                "name": "管理员",
                "description": "所有权限",
                "status": 1,
                "delete": 0,
                "createdAt": new Date(),
                "updatedAt": new Date()
            }
        ])

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('roles');
    }
};