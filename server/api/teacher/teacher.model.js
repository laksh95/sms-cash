let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let validator = require('validator')

let init = function(){
   return teacher = connection.define('teacher',{
           id: {
               type: sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true
           },
           joining_date: {
               type: sequelize.DATE,
               allowNull:false
           },
           designation: {
               type: sequelize.STRING,
               allowNull: false
           },
           experience_years: {
               type: sequelize.INTEGER,
               allowNull: false
           },
           experience_description: {
               type: sequelize.TEXT
           },
           skill:{
            type: sequelize.ARRAY(sequelize.INTEGER),
            defaultValue:null
          },
           status:{
               type:sequelize.BOOLEAN,
               allowNull:false,
               defaultValue:true
           }
       },
       {
           classMethods: {
               associate: function(models) {
                 let teacher = models.teacher
                 let skill = models.skill
                 let user_detail = models.user_detail
                 let department = models.department
                 let teacherSubjectAllocation = models.teacher_subject_allocation

                 skill.hasMany(teacher, {foreignKey: 'skill_set'});
                 teacher.belongsTo(user_detail, {foreignKey: 'user_detail_id'});
                 teacher.belongsTo(department, {foreignKey: 'department_id'});

               },
                totalTeacher: function(db, cb){ //counting number of teachers
                    let teacher = db.teacher
                    return teacher.findAndCountAll()
                    .then((data)=>{
                      dataToSend = {
                        count: data.count,
                        status: 1,
                        message: "Loaded"
                      }
                      return dataToSend
                    })
                    .catch((data)=>{
                        return({
                            status: 0,
                            message: "Failed to load data"
                        })
                    })
                },
               getTeacherAndFeedback: (db, request) => {
                 let teacher = db.teacher
                 let user_detail = db.user_detail
                 let department = db.department
                 let teacherSubjectAllocation = db.teacher_subject_allocation

                 return teacher.findAll({
                   attributes: ['id','designation','user_detail_id',
                    [sequelize.col('user_detail.name'), 'user_name']
                    ],
                    where:{
                     status: true
                   },
                   offset: request.offset,
                   limit: request.limit,
                   include:[
                     {
                     model : db.feedback,
                     attributes : [
                       'teacher_id','subject_id'],
                     include : [{
                       model : db.rating,
                       attributes : [
                         'id',
                         'score',
                         'type'
                       ],
                       required : true,
                       where : {
                         status : true
                       }
                     },
                     {
                       model: subject,
                       attributes: ['id','name'],
                       where : {
                         status : true
                       }
                     }]
                   },
                    {
                       model: user_detail,
                       attributes:[],
                       where:{
                           status: true
                       },
                     },
                     {
                        model: department,
                        attributes: ['id','name'],
                        required : true,
                        where:{
                            course_id: request.course_id
                        },
                      },{
                        model: teacherSubjectAllocation,
                        attributes: ['subject_id'],
                        where:{
                         status: true
                        }
                      },
                    ]
                  })
               }
           }
       })
}
module.exports = init