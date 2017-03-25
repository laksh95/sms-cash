let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
    let user= connection.define('user_detail',{
            id: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: sequelize.STRING,
                allowNull: false
            },
            name:     {
                type: sequelize.STRING,
                allowNull: false
            },
            date_of_birth: {
                type: sequelize.DATE,
                allowNull: false
            },
            profile_pic_url: {
                type: sequelize.STRING,
                unique: true
            },
            gender: {
                type: sequelize.ENUM('MALE','FEMALE','OTHERS'),
                allowNull: false,
                unique: true
            },
            permanent_address: sequelize.STRING,
            current_address: sequelize.STRING,
            email_id: {
                type: sequelize.STRING,
                allowNull: false,
                unique: true
            },
            contact_number: {
                type: sequelize.STRING
            },
            country_code_one: sequelize.INTEGER,
            alternate_number: sequelize.STRING,
            country_code_two: sequelize.INTEGER,
            status:  {
                type: sequelize.BOOLEAN,
                default : true
            },
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
            instanceMethods:{
            }
        }
    );
    return user;
};
