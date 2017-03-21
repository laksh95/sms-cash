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
            experience_years: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            experience_description: {
                type: sequelize.TEXT
            },
            status: {
                type: sequelize.BOOLEAN
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
                totalTeacher: function(db, cb){
                    let teacher = db.teacher
                    return teacher.findAndCountAll().then((data)=>{
                        return data.count
                    })
                }
            }
        })
}
module.exports = init