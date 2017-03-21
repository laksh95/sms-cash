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
      let stud = models.student;
      let user = models.user_detail;
      let dept = models.department;
      let parent = models.parent;
      let batch = models.batch;
      let section = models.section;

      user.hasMany(stud,{
        foreignKey : 'user_detail_id'
      });
    
      dept.hasMany(stud,{
        foreignKey : 'department_id'
      });
      
      stud.belongsTo(parent,{
        foreignKey : 'parent_id'
      });
      
      batch.hasMany(stud,{
        foreignKey : 'batch_id'
      });
      
      stud.belongsToMany(section,{
        through : "student_section_allocation"
      });
    },
    totalStudent: function(db, cb){
      let student = db.student

      return student.findAndCountAll().then((data)=>{
        return data.count
      })
    }
  }
},
{
  instanceMethods:{}
}
);
  return student;
};
