let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
    return uploadResult = connection.define('upload_result',{
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
                let uploadResult = models.upload_result
                let userDetail = models.user_detail
                userDetail.hasMany(uploadResult, {foreignKey: 'uploaded_by'});

                let exam = models.exam
                exam.hasMany(uploadResult, {foreignKey: 'exam_id', unique:'uniqueResultUpload'});

                let subject = models.subject
                subject.hasMany(uploadResult, {foreignKey: 'subject_id', unique:'uniqueResultUpload'});

                let curriculum = models.curriculum
                curriculum.hasMany(uploadResult, {foreignKey: 'curriculum_id', unique:'uniqueResultUpload'});
            }
        }
    })
}

module.exports = init