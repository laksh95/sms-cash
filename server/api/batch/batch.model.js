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
                type: sequelize.INTEGER,
                allowNull:false,
                unique:true
            },
            status: {
              type: sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true
            }
        },
        {
            classMethods: {
              getBatch:(db)=>{
                  let batch=db.batch
                  return batch.findAll({
                      attributes:['id','name'],
                      where: {
                          status: true,
                      },
                  })
                  .then((data)=>{
                    return data
                  })
                  .catch((data)=>{
                    return data
                  })
              }
            }
        })
}
module.exports = init
