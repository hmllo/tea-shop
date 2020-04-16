'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_power = sequelize.define('role_power', {
    role_id: DataTypes.STRING,
    power_id: DataTypes.STRING
  }, {});
  role_power.associate = function(models) {
    // associations can be defined here
  };
  return role_power;
};