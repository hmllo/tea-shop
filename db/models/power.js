'use strict';
module.exports = (sequelize, DataTypes) => {
  const power = sequelize.define('power', {
    name: DataTypes.STRING,
    route: DataTypes.STRING,
    parent_id: DataTypes.STRING
  }, {});
  power.associate = function(models) {
    // associations can be defined here
  };
  return power;
};