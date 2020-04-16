'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  account.associate = function(models) {
    // associations can be defined here
  };
  return account;
};