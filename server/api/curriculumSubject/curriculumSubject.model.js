let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return curriculumSubject = connection.define('curriculum_subject',{
            credit: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            status : {
                type : sequelize.BOOLEAN,
                allowNull: false,
                defaultValue : true

            }
        },
        {
            classMethods: {
                associate: function(models){
                    let curriculumSubject = models.curriculum_subject
                    let subject = models.subject
                    let curriculum = models.curriculum
                    curriculum.belongsToMany(subject,{through: curriculumSubject});
                    subject.belongsToMany(curriculum,{through: curriculumSubject});
                }
            }
        })
}
module.exports = init

