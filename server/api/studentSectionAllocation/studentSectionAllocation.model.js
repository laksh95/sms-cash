let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return studentSectionAllocation = connection.define('student_section_allocation',{
            status:{
                type:sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:true
            }
        },
        {
            classMethods: {
                associate: function(models){
                    let section = models.section
                    let student = models.student
                    let studentSectionAllocation = models.student_section_allocation
                    student.belongsToMany(section, { through: studentSectionAllocation });
                    section.belongsToMany(student, { through: studentSectionAllocation});
                }
            }
        })
}

module.exports = init