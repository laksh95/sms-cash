let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

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
           approved: {
             type: sequelize.BOOLEAN,
             allowNull: false,
             defaultValue: false
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
               /*getting teacher list as per the course selected*/
               fetchTeacherByCourseId: (db, request) => {
                 let teacher = db.teacher
                 let user_detail = db.user_detail
                 let department = db.department

                 return teacher.findAll({
                  attributes: ['id','designation','user_detail_id',
                   [sequelize.col('user_detail.name'),'teacher_name'],
                   [sequelize.col('user_detail.email_id'),'teacher_email'],
                   [sequelize.col('user_detail.contact_number'),'contact_number'],
                   [sequelize.col('user_detail.alternate_number'),'alternate_number'],
                   [sequelize.col('department.name'),'department_name'],
                   'approved',
                   'joining_date','experience_years',
                   'experience_description',
                   'department_id'
                 ],
                   where:{
                    status: true
                  },
                  offset: request.offset,
                  limit: request.limit,
                  include:[
                    {
                       model: user_detail,
                       attributes:[],
                       where:{
                           status: true
                       },
                     },
                    {
                      model: department,
                      attributes: [],
                      where : {
                        status : true,
                        course_id: request.courseId
                      }
                    }
                  ]
                 })
               },
               /*approvong the theacher's addition to the system*/
               approveDetails: (db, request) => {
                 let teacher = db.teacher

                 return teacher.update({
                    approved: true
                  },{
                   where:{
                    id: request.teacherId
                  }
                 })
               },
               changeDetails: (db, request) => {
                 let teacher = db.teacher
                 let user_detail = db.user_detail
                 let department = db.department

                 return teacher.update({
                    designation: request.designation,
                    joining_date: new Date(request.joinDate),
                    department_id: request.department
                  },{
                   where:{
                    id: request.teacherId
                  },
                  include: [
                    {
                      model: user_detail,
                      name: request.name,
                      email_id: request.email,
                      where:{
                       id: teacher.user_detail_id
                     }
                   }
                  ]
                 })
               },
               deleteTeacher: (db, request) => {
                 let teacher = db.teacher
                 let user_detail = db.user_detail
                 let teacherSubjectAllocation = db.teacher_subject_allocation
                 let feedback = db.feedback

                 return teacher.update({
                    status: false
                  },
                  {
                   where:{
                    id: request.teacherId
                  },
                  include: [
                    {
                      model: user_detail,
                      status: false,
                      where:{
                       id: teacher.user_detail_id
                     }
                    },
                    {
                      model: feedback,
                      status: false,
                      where:{
                       teacher_id: request.teacherId
                     }
                    },
                    {
                      model: teacherSubjectAllocation,
                      status: false,
                      where:{
                       teacher_id: request.teacherId
                     }
                    }
                  ]
                 })
               },
               /*getting teacher list and the feedback from feedback table as per the course selected*/
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
