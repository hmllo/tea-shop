'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING,
    cname: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {});
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};