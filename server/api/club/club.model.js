let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let club = connection.define('club',{
            id:{
                type :sequelize.INTEGER ,
                primaryKey : true ,
                autoIncrement : true,
            },
            name :{
                type : sequelize.STRING,
                allowNull: false,
            },
            description : {
                type:sequelize.TEXT ,
                allowNull : false ,
            },
            category : {
                type : sequelize.STRING
            },
            status : {
                type : sequelize.BOOLEAN,
                allowNull: false,
                defaultValue : true
            }
        },
        {
            classMethods : {
                associate : function(models){
                    let teacher = models.teacher
                    teacher.hasMany(club,{
                        foreignKey : "faculty_advisor"
                    })
                    let event = models.event
                    event.hasMany(club,{
                        foreignKey : "event_id"
                    })
                }
            }
        }
    );
    return club;
}
module.exports = sql;

