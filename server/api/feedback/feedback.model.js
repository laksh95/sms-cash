let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
    return feedback = connection.define('feedback',{
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },

    {
        classMethods: {    
            associate: function(models){
                let teacher = models.teacher
                let student = models.student
                let rating = models.rating
                let subject = models.subject
                let section = models.section
                let feedback = models.feedback
                rating.hasMany(feedback,{
                    foreignKey:'rating_id'
                })
                teacher.hasMany(feedback,{
                    foreignKey:'teacher_id'
                })
                student.hasMany(feedback,{
                    foreignKey:'student_id'
                })
                subject.hasMany(feedback,{
                    foreignKey:'subject_id'
                })
                section.hasMany(feedback,{
                    foreignKey:'section_id'
                })

            }
        }
    })
}

module.exports = init
