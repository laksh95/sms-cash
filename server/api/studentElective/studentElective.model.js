let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let studentElective= connection.define('student_elective',{

    id:{
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    preference_number: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    status:  {
      type: sequelize.BOOLEAN,
      default: true
    }
  },
  {
  classMethods: {
                  associate: function(models){
                    let elective= models.elective;
                    let student= models.student;
                    let subject= models.subject;
                    let studentElective= models.student_elective;
                    student.hasMany(studentElective,{
                      foreignKey : 'student_id',
                      primaryKey: 'pkElective'
                    });
                    elective.hasMany(studentElective,{
                      foreignKey : 'elective_id',
                      primaryKey: 'pkElective'
                    });
                    subject.hasMany(studentElective,{
                      foreignKey : 'subject_id',
                      primaryKey: 'pkElective'
                    });

                  }
  }
},
{
  instanceMethods:{}
}
);
  return studentElective;
};
