let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
    return batch = connection.define('batch',{
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: sequelize.STRING,
        allowNull:false,
        unique:true
      },
      status:{
        type:sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      classMethods: {
    }
  })
}
module.exports = init
