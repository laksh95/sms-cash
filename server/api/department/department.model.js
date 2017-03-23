let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function() {
   return department = connection.define('department',{
       id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:'uniqueDepartment'
       },
       abbreviated_name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:'uniqueDepartment'
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false,
           defaultValue:true
       }
   },{
       classMethods:{
           associate:function(model){
               let course=model.course
               let dept=model.department
               course.hasOne(dept,{
                   foreignKey:'course_id',
                   unique:'uniqueDepartment'
               })
           },
            addDepartment:function(model,setData,cb){
               let department=model.department
                let course=model.course
                course.findOne({
                    attributes:['id'],
                    where:{
                        name:setData.course_name
                    }
                }).then((data)=>{
                    department.create({
                        name:setData.name,
                        abbreviated_name:setData.abbreviated_name,
                        course_id:data.dataValues.id
                    }).then((data)=>{
                        cb(data)
                    }).catch((err)=>{
                       cb(err)
                    })
                })
            }
       }
   })
}
module.exports=init