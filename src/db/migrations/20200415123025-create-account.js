'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING(11)
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING(11)
            },
            phone: {
                type: Sequelize.STRING(11)
            },
            status: {
                defaultValue: 1,
                type: Sequelize.INTEGER(1).UNSIGNED
            },
            roleId: {
                type: Sequelize.INTEGER(11)
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
        return queryInterface.dropTable('accounts');
    }
};