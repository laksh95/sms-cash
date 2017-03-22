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
                type: sequelize.STRING,
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
            country_code1: sequelize.INTEGER,
            alternate_number: sequelize.STRING,
            country_code2: sequelize.INTEGER,
            status:  {
                type: sequelize.BOOLEAN,
                default : true
            }
        },
        {
            classMethods: {
                getUserByCredential: function(models, userName, cb){

                    let userDetail= models.user_detail;
                    let director= models.director;
                    let admin= models.admin;
                    let hod=models.hod;
                    let teacher= models.teacher;
                    let student=models.student;
                    let user={};
                    let role=[];
                    let login=false;
                    let userId=0;

                    userDetail.findOne({attributes:['id', 'name', 'password'], 
                        where: {username: userName, status:true}
                         }).then((result)=> {
                            if(result){
                                user.login=true;
                                userId= result.dataValues.id;
                                user.id= userId;
                                user.name= result.dataValues.name;
                                user.password= result.dataValues.password;
                                admin.findOne({attributes: ['id'], where: {user_detail_id: userId}}).
                                then((resultAdmin)=> {
                                    if(resultAdmin){
                                        role.push('admin');
                                    }
                                    return director.findOne({attributes: ['id'], where: {user_detail_id: userId}})   
                                })
                                .then((resultDirector)=>{
                                    if(resultDirector){
                                        role.push('director');
                                    }
                                    return hod.findOne({attributes: ['id'], where: {user_detail_id: userId}})
                                })
                                .then((resultHod)=>{
                                    if(resultHod){
                                        role.push('hod');
                                    }
                                    return teacher.findOne({attributes: ['id'], where: {user_detail_id: userId}})
                                })
                                .then((resultTeacher)=> {
                                    if(resultTeacher){
                                        role.push('teacher');
                                    }
                                    return student.findOne({attributes: ['id'], where: {user_detail_id: userId}})
                                })
                                .then((resultStudent)=> {
                                    if(resultStudent){
                                        role.push('student');
                                    }
                                    user.role=role;
                                    cb(null,user);
                                })
                            }
                            else{
                                user.login=false;
                                cb(null, null);  
                            }
                         }).catch(function(error){
                                console.log(error);
                                cb(error);
                        });

                   
                },
                
                findUserById: function(models, id, cb){
                    let userDetail= models.user_detail;
                    let user={};
                    userDetail.findOne({attributes:['id', 'name'], 
                    where: {id: id, status:true}
                    }).then((result)=> {
                        if(result){
                            user.login=true;
                            user.id= result.dataValues.id;
                            user.name= result.dataValues.name;
                            cb(null,user);
                        }
                        else{
                            user.login=false;
                            cb(error);
                        }
                    })
                }


            }
        },
        {
            instanceMethods:{
            }
        }
    );
    return user;
};