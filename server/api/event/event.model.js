let data = require('./../../config/db')
let connection = data.connection
let sequelize = data.sequelize
let sql = function(){
    let event = connection.define('event',{
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
            start_time : {
                type: sequelize.DATE ,
                allowNull : false
            },
            end_date : {
                type: sequelize.DATE ,
                allowNull : false
            },
            venue : {
                type: sequelize.STRING,
            },
            status : {
                type:sequelize.BOOLEAN,
                defaultValue : true
            },
        },
        {
            classMethods : {
                associate : function(models){
                    let userDetail  = models.user_detail
                    let event = models.event
                    userDetail.hasMany(event,{
                        foreignKey : "creator_id"
                    })
                    let department = models.department
                    event.belongsToMany(department, {
                        through : "event_department"
                    });
                    let role = models.role
                    event.belongsToMany(role, {
                        through : "event_role"
                    })
                    let club = models.club
                    event.belongsToMany(club,{
                        through : "club_event"
                    })


                }
            }
        }
    );
    return event;
}
module.exports = sql;

