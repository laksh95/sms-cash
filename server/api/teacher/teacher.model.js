let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
var moment = require('moment');
var bcrypt = require('bcrypt');
let mailer = require('nodemailer')
  let transporter = mailer.createTransport({
    service:'gmail',
    auth:{
      user:'ignore.john2017@gmail.com',
      pass:'madman2017'
      }
    })
let myPlaintextPassword=''
const saltRounds = 10;

let addUser=((data,db)=>{
  let name=data.name;
  let removeSpaces=name.trim();
  let uname='';
  let nameArray=removeSpaces.split(" ");
  if(nameArray[1]!=undefined||nameArray[1]!=null){
    name=nameArray[0]+" "+nameArray[1];
    uname=nameArray[0]+"_"+nameArray[1];
  }
  else{
    name=uname=nameArray[0]
  }
    return db.user_detail.findAndCountAll({
      where:{
        name:{
          $iLike: name+'%'
        },
      }
    })
    .then((users)=>{

      let yearOfBirth=moment(data.dateOfBirth).year();
      let username=uname+"_"+yearOfBirth+(users.count+1)
      let password=''

      var firstName=name[0].split('')
      for (var ch in firstName) {
          myPlaintextPassword=firstName[ch]+ (Math.floor(Math.random()*90000) + 10000);
      }
      return bcrypt.hash(myPlaintextPassword, saltRounds).
        then((password)=> {
          return db.user_detail.create({
            username:username,
            password: password,
            name:data.name,
            date_of_birth: new Date(data.dateOfBirth),
            gender:data.gender ,
            email_id:data.emailId ,
            status:'t'
          })
        });
    })
  })

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

                 return teacher.findOne({
                   attributes: ['user_detail_id'],
                   where:{
                    id: request.teacherId
                  }
                 })
                 .then((data)=>{
                   let user_detail_id = data.dataValues.user_detail_id
                   return teacher.update({
                      designation: request.designation,
                      joining_date: new Date(request.joinDate),
                      department_id: request.department
                    },{
                     where:{
                      id: request.teacherId
                    }
                   })
                   .then((data) => {
                     return user_detail.update({
                       name: request.name,
                       email_id: request.email,
                      },{
                        where:{
                         id: user_detail_id
                       }
                     })
                   })
                 })
                 .catch((data)=>{
                   return data
                 })
               },
               deleteTeacher: (db, request) => {
                 let teacher = db.teacher
                 let user_detail = db.user_detail
                 let teacherSubjectAllocation = db.teacher_subject_allocation
                 let feedback = db.feedback

                 return teacher.findOne({
                   attributes: ['user_detail_id'],
                   where:{
                    id: request.teacherId
                  }
                 })
                 .then((data)=>{
                   let user_detail_id = data.dataValues.user_detail_id
                   return teacher.update({
                      status: false
                    },
                    {
                     where:{
                      id: request.teacherId
                    }
                   })
                   .then((data) => {
                     return user_detail.update({
                       status: false,
                      },{
                        where:{
                         id: user_detail_id
                       }
                     })
                     .then((data)=>{
                       return feedback.update({
                         status: false,
                        },{
                          where:{
                           teacher_id: request.teacherId
                         }
                       })
                       .then((data)=>{
                         return teacherSubjectAllocation.update({
                           status: false,
                          },{
                            where:{
                             teacher_id: request.teacherId
                           }
                         })
                       })
                     })
                   })
                 })
                 .catch((data)=>{
                   return data
                 })
               },
               addTeacher:(db, request)=>{
                 let teacher=db.teacher;
                 let userAdded,teacherAdded;
                 const p = new Promise((res,rej)=>{
                  addUser(request,db)
                 .then((user)=>{
                   userAdded=user;
                   request.userId=userAdded.id;
                   data=request;
                   let message={
                     from:'"Ghost In Action" <ignore.john@gmail.com>',
                     to: user.email_id,
                     subject:'Student Management System Temporary Login Credentials',
                     text:' Username is ' + userAdded.username + 'and password is '+myPlaintextPassword
                  }


                    teacher.create({
                              status:'t',
                              user_detail_id:data.userId,
                              department_id:data.deptId,
                              joining_date: new Date(data.joinDate),
                              designation: data.designation,
                              experience_years: 0
                           }).then((data)=>{
                             transporter.sendMail(message,(error, info)=>{
                              let response = {}
                              if(error){
                                response = {
                                data:[],
                                msg:'internal server error',
                                status:0
                                }
                              }
                              })
                             res(data)
                           }).catch((data)=>{
                            rej(data)
                           })
                 }).catch((err)=>{
                  rej(err)
                 })
                })
                 return p;

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
