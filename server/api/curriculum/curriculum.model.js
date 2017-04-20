let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
    return curriculum = connection.define('curriculum',{
        id:{
            type:sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
        },
        name:{
            type:sequelize.STRING,
                allowNull:false,
        },
        status : {
            type : sequelize.BOOLEAN,
                allowNull: false,
                defaultValue : true
        }
    },{
        classMethods:{
            associate:function(model){
                let curriculum=model.curriculum
                let department=model.department
                let academicYear = model.academic_year
                let semester= model.semester
                department.hasMany(curriculum,{
                    foreignKey:'department_id'
            });
                curriculum.belongsTo(academicYear,{
                    foreignKey:'academic_year_id'
            });
                curriculum.belongsTo(semester,{
                    foreignKey:'semester_id'
            });

            }
        }
    })
}
module.exports=init