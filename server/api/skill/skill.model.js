let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let SkillData=function(){    
    let skill= connection.define('skill',{
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize.STRING,
            }
        }
    );
    return skill;
}
module.exports=SkillData;