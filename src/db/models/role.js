'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {});
  role.associate = function(models) {
    role.hasOne(models.role_power);
    role.hasOne(models.account); 
  };
  return role;
};