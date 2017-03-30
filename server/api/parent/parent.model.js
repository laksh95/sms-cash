let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
    let parent= connection.define('parent',{
            id: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            mother_name:     {
                type: sequelize.STRING,
                allowNull: false
            },
            father_name:     {
                type: sequelize.STRING,
                allowNull: false
            },
            email_id: {
                type: sequelize.STRING,
                allowNull: false,
                unique: true
            },
            contact_number: {
                type: sequelize.STRING
            },
            country_code: sequelize.INTEGER,
            status:{
                type:sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:true
            }
        },
        {
            classMethods: {
            }
        },
        {
            instanceMethods:{}
        }
    );
    return parent;
};

