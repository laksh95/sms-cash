let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function(){
   return course=connection.define('course',{
       id:{
           type:sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true
       },
       name:{
           type:sequelize.STRING,
           allowNull:false,
           unique:true
       },
       duration:{
           type:sequelize.FLOAT,
           allowNull:false
       },
       status:{
           type:sequelize.BOOLEAN,
           allowNull:false,
           defaultValue:true
       }
   },
   {
       classMethods:{
           associate:(model)=>{

           },
           getCourse:(db,cb)=>{
               let course=db.course
               let department=db.department
               course.findAll({
                   attributes:['id','name','duration',[sequelize.fn('count',sequelize.col('department.id')),'noOfDept']],
                    where:{
                       status:'t'
                    },
                   group:['course.id','course.name','course.duration'],
                   include:[{
                       model:department,
                       attributes:[]
                   }]
               }).then((data)=>{
                   cb(data)
               })
           },
           addNewCourse:(db,setData,cb)=>{
               db.course.create({
                   name:setData.course_name,
                   duration:setData.duration
               }).then((data)=>{
                   cb(data)
               })
           },
           editCourse:(db,updateData,cb)=>{
               let course=db.course
               course.update({
                   name:updateData.name,
                   duration:updateData.duration
               },{
                   where:{
                       id:updateData.id
                   }
               }).then((data)=>{
                   cb(data)
               })

           },
           deleteCourse:(db,deleteId,cb)=>{
               let course = db.course
               course.update({
                   status:'f'
               },{
                   where:{
                       id:deleteId
                   }
               }).then((data)=>{
                   cb(data)
               })


           }
       }
   })
}
module.exports=init