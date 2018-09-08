'use strict';
// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
    uri: 'postgres://postgres:root@localhost:5432/localSMS',
    // uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
    options: {
      logging: false,
      dialect: 'postgres',
      define: {
        timestamps: true,
        underscored: true,
         freezeTableName: true,
      }
    }
  }
};

