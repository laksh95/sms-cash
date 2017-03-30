let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let init=function(){
    return course=connection.define('course',{
            id:{
                type:sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type:sequelize.STRING,
                allowNull:false
            },
            duration:{
                type:sequelize.FLOAT,
                allowNull:false
            },
            status:{
                type:sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:true
            }
        },
        {
            classMethods:{
                associate:(model)=>{

                },
                getCourse:(db,sendData)=>{
                    let course=db.course
                    let department=db.department
                    course.findAll({
                        attributes:['id','name','duration',[sequelize.fn('count',sequelize.col('department.id')),'noOfDept']],
                        where:{
                            status:'t'
                        },
                        group:['course.id','course.name','course.duration'],
                        include:[{
                            model:department,
                            attributes:[]
                        }]
                    }).then((data)=>{
                        sendData(data)
                    })
                },
                addNewCourse:(db,setData,sendData)=>{
                    let course=db.course
                    let response={}
                    course.findAll({
                        attributes:['name','status'],
                        where:{
                            name:setData.course_name
                        }
                    }).then((data)=>{
                        if(data.length==0){
                            db.course.create({
                                name:setData.course_name,
                                duration:setData.duration
                            }).then((data)=>{
                                response={
                                    status:1,
                                    content:data
                                }
                                sendData(response)
                            })
                        }
                        else {
                            let course = data
                            let flag = 1
                            for (let index in course) {
                                if (course[index].dataValues.status == true) {
                                    flag = 0
                                }
                            }
                            if (1 === flag) {
                                db.course.create({
                                    name: setData.course_name,
                                    duration: setData.duration
                                }).then((data) => {
                                    response = {
                                        status: 1,
                                        content: data
                                    }
                                    sendData(response)
                                })
                            }
                            else {
                                response = {
                                    status: 0,
                                    content: 'Course Already exists.'
                                }
                                sendData(response)
                            }
                        }
                    })
                },
                editCourse:(db,updateData,sendData)=>{
                    let course=db.course
                    course.update({
                        name:updateData.name,
                        duration:updateData.duration
                    },{
                        where:{
                            id:updateData.id
                        }
                    }).then((data)=>{
                        sendData(data)
                    })

                },
                deleteCourse:(db,deleteId,sendData)=>{
                    let course = db.course
                    course.update({
                        status:'f'
                    },{
                        where:{
                            id:deleteId,
                            status:'t'
                        }
                    }).then((data)=>{
                        sendData(data)
                    })
                }
            }
        })
}
module.exports=init