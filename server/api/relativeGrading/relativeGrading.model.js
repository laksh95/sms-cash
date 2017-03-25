/**
 * Created by mustang on 17/03/17.
 */
let database = require('../../config/db')
let sequelize=database.sequelize
let connection = database.connection
let init=function(){
    return relativeGrading = connection.define('relative_grading',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        grade:{
            type:sequelize.STRING
        },
        start_marks:{
            type:sequelize.INTEGER
        },
        end_marks:{
            type:sequelize.INTEGER
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },{
        classMethods:{
            associate:function(model){
                let exam=model.exam
                let curriculum = model.curriculum
                let subject = model.subject
                let relative = model.relative_grading
                exam.hasMany(relative,{
                  foreignKey:'exam_id'
                })
                curriculum.hasMany(relative,{
                    foreignKey:'curriculum_id'
                })
                subject.hasMany(relative,{
                    foreignKey:'subejct_id'
                })
            }
        }
    })
}
module.exports=init
