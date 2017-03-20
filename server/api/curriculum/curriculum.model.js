let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init = function(){
    return curriculum = connection.define('curriculum',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:sequelize.STRING,
            allowNull:false,
            unique:true
        },
        semester:{
            type:sequelize.INTEGER,
            allowNull:false
        },
        year:{
            type:sequelize.INTEGER,
            allowNull:false
        },
        sem_start_date:{
            type:sequelize.DATE,
            allowNull:false
        },
        sem_end_date:{
            type:sequelize.DATE,
            allowNull:false
        }
    },{
        classMethods:{
            associate:function(model){
                let curr=model.curriculum
                let dept=model.department
                dept.hasMany(curr,{
                    foreignKey:"department_id"
                })
            }
        }
    })
}
module.exports=init