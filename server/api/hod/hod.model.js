/**
 * Created by mustang on 17/03/17.
 */
let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
    return hod=connection.define('hod',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        end_date:{
            type:sequelize.DATE,
            allowNull:false
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false
        }
    },{
        classMethods:{
            associate:function(model){

                let userDetail=model.user_detail
                let hod=model.hod
                
                hod.belongsTo(userDetail,{
                   foreignKey:'user_detail_id'
               })

                let teacher=model.teacher
                let hod=model.hod
                hod.belongsTo(teacher,{
                    foreignKey:'teacher_id'
                })
            }
        }
    })
}
module.exports=init