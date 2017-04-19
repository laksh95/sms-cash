'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // Sequelize connection opions
    sequelize: {
        uri: 'postgres://postgres:shilpa@localhost:5432/sms',
        options: {
            logging: true,
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


//'postgres://postgres:postgres@localhost:5432/sms'
