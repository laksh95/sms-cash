let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let student= connection.define('student',{
    id: { 
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    status:  {
          type: sequelize.BOOLEAN,
          default: true
        },
    admission_no: {
                    type: sequelize.INTEGER,
                    allowNull: false,
                    unique: true
                  }
  },
  {
  classMethods: {
                  associate: function(models){
                     let student = models.student;
                     let user = models.user_detail;
                     let department = models.department;
                     let parent = models.parent;
                     let batch = models.batch;
                     let section = models.section;
                    user.hasMany(student,{
                      foreignKey : 'user_detail_id'
                     });
                      department.hasMany(student,{
                      foreignKey : 'department_id'
                     });
                     student.belongsTo(parent,{
                      foreignKey : 'parent_id'
                     });
                     batch.hasMany(student,{
                      foreignKey : 'batch_id'
                     });
                     student.belongsToMany(section,{
                       through : "student_section_allocation"
                      });
                  }
  }
},
{
  instanceMethods:{}
}
);
  return student;
};
