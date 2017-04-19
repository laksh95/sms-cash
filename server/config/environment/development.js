'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // Sequelize connection opions
    sequelize: {
        uri: 'postgres://postgres:postgres@localhost:5432/smsInternal',
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