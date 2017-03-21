let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let SkillData=function(){
    let skill=database.connection.define('skill',{
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: database.sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: database.sequelize.STRING,
            }
        }
    );
    return skill;
}
module.exports=SkillData;