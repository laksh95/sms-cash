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
                allowNull:false,
                validate: {
                  isDate: true,
                  notEmpty: true
                }
            },
            designation: {
                type: sequelize.STRING,
                allowNull: false,
                validate: {
                  notEmpty: true,
                  isAlpha: true
                }
            },
            experience_years: {
                type: sequelize.INTEGER,
                allowNull: false,
                validate: {
                  notEmpty: true,
                  isInt: true
                }
            },
            experience_description: {
                type: sequelize.TEXT,
                validate: {
                  notEmpty: true
                }
            },
            status: {
                type: sequelize.BOOLEAN,
                validate: {
                  isBoolean: true
                }
            }
        },
        {
            classMethods: {
                associate: function(models){
                    let teacher = models.teacher
                    let skill = models.skill
                    let user_detail = models.user_detail
                    let department = models.department
                    skill.hasMany(teacher, {foreignKey: 'skill_set'});
                    user_detail.hasOne(teacher, {foreignKey: 'user_id'});
                    department.hasOne(teacher, {foreignKey: 'department_id'});
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
                }
            }
        })
}
module.exports = init
