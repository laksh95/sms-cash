'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:postgres@localhost:5432/smsInternal',
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
}