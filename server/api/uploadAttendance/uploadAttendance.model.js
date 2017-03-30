let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function(){
    return uploadAttendance=connection.define('upload_attendance',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        classNumber:{
            type:sequelize.INTEGER,
            date:sequelize.DATE,
            allowNull:false
        },
        status:{
            type:sequelize.ENUM('ACTIVE','INACTIVE'),
            allowNull: false,
            defaultValue: 'ACTIVE'

        }
    },{
        classMethods:{
            associate:function(model){
                let subject=model.subject
                let section=model.section
                let uploadAttendance=model.upload_attendance
                let user=model.user_detail
                subject.hasMany(uploadAttendance,{
                    foreignKey:"subject_id"
                })
                section.hasMany(uploadAttendance,{
                    foreignKey:"section_id"
                })
                user.hasOne(uploadAttendance,{
                    foreignKey:"user_id"
                })
            }
        }
    })
}
module.exports=init