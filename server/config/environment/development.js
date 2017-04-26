'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connection options
  sequelize: {
<<<<<<< HEAD
   uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
=======
    uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
>>>>>>> a74a09181712b4d85f017d4b712c0e9c19f7eb1d
    options: {
      //logging: false,
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
