'use strict';
// Production specific configuration
// =================================
module.exports = {
  sequelize: {
    uri:  process.env.SEQUELIZE_URI ||'postgres://postgres:cronj123@192.168.1.223:5432/sms',
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