'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connection options
  sequelize: {
<<<<<<< HEAD
    uri: 'postgres://postgres:postgres@localhost:5432/smsInternal',
=======
    uri: 'postgres://postgres:shilpa@localhost:5432/sms',
>>>>>>> admin-teacher
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
//uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
