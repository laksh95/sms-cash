'use strict';
// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
<<<<<<< HEAD

    uri: 'postgres://postgres:root@localhost:5432/localSMS',
=======
    // uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
    uri: 'postgres://postgres:password@localhost:5432/localsms',
>>>>>>> upstream/development
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

