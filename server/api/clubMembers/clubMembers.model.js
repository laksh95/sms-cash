let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let clubMembers = connection.define('club_members',{
            position:{
                type :sequelize.ENUM('President','Treasurer') ,
                allowNull : false
            }
        },
        {
            classMethods : {
                associate : function(models){
                    let clubMembers = models.club_members
                    let club = models.club
                    let student = models.student
                    club.hasMany(clubMembers,{
                        foreignKey : "club_id",
                        primaryKey : "true"
                    })
                    student.hasMany(clubMembers,{
                        foreignKey : "student_id",
                        primaryKey : "true"
                    })
                }
            }
        }
    );
    return clubMembers;
}
module.exports = sql;