'use strict';
// Development specific configuration
// ==================================
module.exports = {
  sequelize: {

    uri: 'postgres://postgres:root@localhost:5432/localSMS',
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

