'use strict';
module.exports = (sequelize, DataTypes) => {
    const power = sequelize.define('power', {
        path: DataTypes.STRING,
        name: DataTypes.STRING,
        redirect: DataTypes.STRING,
        component: DataTypes.STRING,
        parentId: DataTypes.STRING,
        sort: DataTypes.STRING,
        icon: DataTypes.STRING,
    }, {});
    power.associate = function (models) {
        // associations can be defined here
        power.hasOne(models.role_power);
    };
    return power;
};