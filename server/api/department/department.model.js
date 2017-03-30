let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function() {
    return department = connection.define('department',{
        id:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:sequelize.STRING,
            allowNull:false,
            unique:'uniqueDepartment'
        },
        abbreviated_name:{
            type:sequelize.STRING,
            allowNull:false,
            unique:'uniqueDepartment'
        },
        status:{
            type:sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },{
        classMethods:{
            associate:function(model){
                let course=model.course
                let dept=model.department
                course.hasOne(dept,{
                    foreignKey:'course_id',
                    unique:'uniqueDepartment'
                })
            },
            addDepartment:function(models,newDepartment,cb){
                let department=models.department;
                let course=models.course;
                course.findOne({
                    attributes:['id'],
                    where:{
                        id:newDepartment.course_id,
                        status : true
                    }
                }).then((courseData)=>{
                    if(courseData==null){
                        let response = {
                            status : "0",
                            msg :"course not available",
                            data : courseData
                        }
                        cb(response)
                    }
                    else{
                        console.log("found course ")
                        department.findAll({
                            where :{
                                name : newDepartment.name,
                                course_id : courseData.dataValues.id
                            }
                        }).then((data)=>{
                            console.log("Finding department",data)
                            if(0==data.length){
                                console.log("No department found")
                                department.create({
                                    name:newDepartment.name,
                                    abbreviated_name:newDepartment.abbreviated_name,
                                    course_id:courseData.dataValues.id
                                }).then((data)=>{
                                    let response = {
                                        status : "1",
                                        msg :" Department Added Successfully",
                                        data : data
                                    }
                                    cb(response)
                                }).catch((err)=>{
                                    let response = {
                                        status : "0",
                                        msg :"Internal Server Error",
                                        data : err
                                    }
                                    cb(response)
                                })
                            }
                            else {
                                console.log("department found ")
                                let flag = 1
                                for(let index in data){
                                    if(data[index].dataValues.status ==true){
                                        flag  =0
                                    }
                                }
                                if(1==flag){
                                    console.log("status : false ")
                                    department.create({
                                        name:newDepartment.name,
                                        abbreviated_name:newDepartment.abbreviated_name,
                                        course_id:data.dataValues.id
                                    }).then((data)=>{
                                        let response = {
                                            status : "1",
                                            msg :" Department Added Successfully",
                                            data : data
                                        }
                                        cb(response)
                                    }).catch((err)=>{
                                        let response = {
                                            status : "0",
                                            msg :"Internal Server Error",
                                            data : err
                                        }
                                        cb(response)
                                    })
                                }
                                else {
                                    let response = {
                                        status : "0",
                                        msg :"Department Already exists ",
                                        data : {}
                                    }
                                    cb(response)
                                }
                            }
                        })
                            .catch((err)=>{
                                let response = {
                                    status : "0",
                                    msg :"Internal Server Error",
                                    data : err
                                }
                                cb(response)
                            })
                    }
                })
            },
            editDepartment : function(models ,curDepartment ,cb){
                console.log(curDepartment)
                let department = models.department
                department.update({
                        name:curDepartment.name ,
                        abbreviated_name : curDepartment.abbreviated_name
                    },{
                        where :{
                            id : curDepartment.id
                        }
                    }
                ).then((data)=>{
                    let response = {
                        status : "1",
                        data : curDepartment ,
                        msg : "edited successfully"
                    }
                    cb(response)
                })
                    .catch((data)=>{
                        let response = {
                            status : "0",
                            data :{},
                            msg :"Internal Server Error"
                        }
                        cb(response)
                    })
            },
            deleteDepartment:function(models,cur_id,cb){
                console.log("inside deleteDepartment")
                let department = models.department
                department.update({
                    status : 'f'
                },{
                    where : {
                        id : cur_id ,
                        status : 't'
                    }
                }).then((data)=>{
                    let response = {
                        status : "1",
                        msg : "deleted Successfully",
                        data : {}
                    }
                    cb(response)
                })
            },

            getDepartments: function(models,courseId, cb){
                let department = models.department;
                department.findAll({
                    where: {
                        course_id: courseId,
                        status: true
                    }
                }).then((data) => {
                    let departments=[];
                    let promises = []
                    data.map((dept, index) => {
                        let student = models.student
                        let cur_dep =  dept.dataValues
                        promises.push(student.findAndCountAll({
                            where : {
                                department_id :cur_dep.id,
                                status : true
                            }
                        }))
                    })
                    Promise.all(promises).then(values=>{
                        data.map((dept,index)=>{
                            let cur_dept = dept.dataValues
                            cur_dept['total_no_of_students']= values[index].count
                            departments.push(cur_dept)
                        })
                        cb(departments)
                    })
                })
            }
        }
    })
}
module.exports=init
