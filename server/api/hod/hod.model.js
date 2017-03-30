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
           allowNull:false,
           defaultValue:true
       }
   },{
       classMethods:{
           associate:function(model){
               let user_detail=model.user_detail
               let hod=model.hod
               hod.belongsTo(user_detail,{
                   foreignKey:'user_detail_id'
               })
           }
       }
   })
}
module.exports=init