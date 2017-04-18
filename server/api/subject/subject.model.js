/**
 * Created by mustang on 16/03/17.
 */
 let database = require('../../config/db')
 let sequelize=database.sequelize
 let connection=database.connection
 let init = function () {
     return subject = connection.define('subject',{
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
         status: {
             type:sequelize.BOOLEAN,
         }
     },
     {
         classMethods: {
             associate: function(models){
                 var subject = models.subject
                 var skill = models.skill
                 let department = models.department
                 department.hasOne(subject, {foreignKey: 'department_id'})
                 skill.hasMany(subject, {foreignKey: 'skill_set'})
             },
             getSubjectAndDepartment: (db, request) => {
              let subject = db.subject
              let department = db.department

              return department.findAll({
                attributes: [],
                where: {
                  status: true,
                  course_id: request.courseId
                },
                include:[{
                  model: subject,
                  attributes:['id','name'],
                  where:{
                    status: true
                  }
                }]
              })
            },
            abc: () => {

            }
        }
    })
}

module.exports = init
