let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
  let clubMembers = connection.define('club_members',{
    position:{
      type :sequelize.ENUM('President','Treasurer') ,
      allowNull : false
    },
    status:{
      type : sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : true
    }
  },
  {
    classMethods : {
      associate : function(models){
        let clubMembers = models.club_members
        let club = models.club
        let student = models.student
        club.belongsToMany(student,{
          through:clubMembers, foreignKey: 'club_id'
        });
        student.belongsToMany(club, {
          through: clubMembers, foreignKey: 'student_id'
        });
      }
    }
  });
  return clubMembers;
}
module.exports = sql;