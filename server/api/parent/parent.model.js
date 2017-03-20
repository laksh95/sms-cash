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
            status:  {
                type: sequelize.BOOLEAN,
                defaultValue: true
            }
        },
        {
            classMethods: {
                addParentDetail: function(db, inputData){
                    let parent = db.parent

                    parent.create({
                        mother_name: inputData.mother_name,
                        father_name: inputData.father_name,
                        email_id: inputData.email_id,
                        contact_number: inputData.contact_number,
                        country_code: inputData.country_code
                    })
                },
                totalParent: function(db, cb){
                    let parent = db.parent

                    return parent.findAndCountAll().then((data)=>{
                        return data.count
                    })
                }
            }
        },
        {
            instanceMethods:{}
        }
    );
    return parent;
};