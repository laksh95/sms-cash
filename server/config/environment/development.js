'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // Sequelize connection options
    sequelize: {

        uri: 'postgres://postgres:shilpa@localhost:5432/sms',//'postgres://postgres:cronj123@192.168.1.223:5432/sms',

        options: {
           logging: false,
            dialect: 'postgres',
            //storage: 'dev.sqlite',
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true,
            }
        }
    },
};
