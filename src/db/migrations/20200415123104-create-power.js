'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('powers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            path: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            redirect: {
                type: Sequelize.STRING
            },
            component: {
                type: Sequelize.STRING
            },
            parentId: {
                type: Sequelize.INTEGER
            },
            sort: {
                type: Sequelize.INTEGER
            },
            icon: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('powers');
    }
};