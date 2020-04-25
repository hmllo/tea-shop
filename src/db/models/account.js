'use strict';
module.exports = (sequelize, DataTypes) => {
    const account = sequelize.define('account', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER
    }, {});
    account.associate = function (models) {
        // associations can be defined here
        account.belongsTo(models.role, {
            as: 'role',
            foreignKey:  'roleId', 
            targetKey: 'id'
        });
    };
    
    return account;
};