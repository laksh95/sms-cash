let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
     return elective=database.connection.define('elective',{
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize.STRING,
            },
            credits: {
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
            name: {
                type: sequelize.INTEGER,
                allowNull:false,
                unique:true
            }
        },
        {
            classMethods: {
                 associate: function(models){
                    let curriculum = models.curriculum

                    skill.hasMany(teacher, {foreignKey: 'skill_set'});
                    user_detail.hasOne(teacher, {foreignKey: 'user_id'});
                    department.hasOne(teacher, {foreignKey: 'department_id'});
                }
            }
        })
}
module.exports = init