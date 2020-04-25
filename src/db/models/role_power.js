'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_power = sequelize.define('role_power', {
    roleId: DataTypes.STRING,
    powerId: DataTypes.STRING
  }, {});
  role_power.associate = function(models) {
    // associations can be defined here
    role_power.belongsTo(models.role, {
        as: 'role',
        foreignKey:  'roleId', 
        targetKey: 'id'
    });
    role_power.belongsTo(models.power, {
        as: 'power',
        foreignKey:  'powerId', 
        targetKey: 'id'
    });
  };
  return role_power;
};