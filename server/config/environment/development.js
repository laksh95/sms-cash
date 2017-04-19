'use strict';
// Development specific configuration
// ==================================
module.exports = {
    // Sequelize connection options
    sequelize: {
        uri: 'postgres://postgres:postgres@localhost:5432/smsInternal',
        options: {
           // logging: false,
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
