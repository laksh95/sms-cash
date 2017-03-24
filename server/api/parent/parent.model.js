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
                addParentDetail: function(db, inputData, cb){ //creating a parent entry
                    let parent = db.parent

                    parent.create({
                        mother_name: inputData.mother_name,
                        father_name: inputData.father_name,
                        email_id: inputData.email_id,
                        contact_number: inputData.contact_number,
                        country_code: inputData.country_code
                    })
                    .then((data)=>{
                        console.log("DONE CREATE")
                        cb({
                            status: 1,
                            message: "Created an entry"
                        })
                    })
                    .catch((data)=>{
                        cb({
                            status: 0,
                            message: "Failed to create an entry"
                        })
                    })
                },
                totalParent: function(db, cb){ //counting total number of parents
                    let parent = db.parent
                    return parent.findAndCountAll()
                    .then((data)=>{
                      dataToSend = {
                        count: data.count,
                        status: 1,
                        message: "Loaded"
                      }
                      return dataToSend
                    })
                    .catch((data)=>{
                        return({
                            status: 0,
                            message: "Failed to load data"
                        })
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
