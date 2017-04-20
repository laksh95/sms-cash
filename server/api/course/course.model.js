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
                getCourse:(db)=>{
                    let course=db.course
                    let department=db.department
                    return course.findAll({
                        attributes:['id','name','duration',[sequelize.fn('count',sequelize.col('department.id')),'noOfDept']],
                        where:{
                            status:'t'
                        },
                        group:['course.id','course.name','course.duration'],
                        include:[{
                            model:department,
                            attributes:[]
                        }]
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
                        if(data.length === 0){
                            db.course.create({
                                name:setData.course_name,
                                duration:setData.duration
                            }).then((data)=>{
                                data = data.dataValues
                                data.noOfDept=0
                                response={
                                    status:1,
                                    data,
                                    msg:'Course Added Successfully'
                                }
                                sendData(response)
                            })
                            .catch((err)=>{
                                let response = {
                                    status : 0,
                                    data :[],
                                    msg : "Internal Server Error"
                                }
                                sendData(response)
                            })
                        }
                        else {
                            let course = data
                            let flag = 1
                            for (let index in course) {
                                if (course[index].dataValues.status === true) {
                                    flag = 0
                                }
                            }
                            if (1 === flag) {
                                db.course.create({
                                    name: setData.course_name,
                                    duration: setData.duration
                                }).then((data) => {
                                    data['noOfDept'] =0
                                    response = {
                                        status: 1,
                                        data,
                                        msg:'Course Added Successfully'
                                    }
                                    sendData(response)
                                })
                                    .catch((err)=>{
                                        let response = {
                                            status : 0,
                                            data :[],
                                            msg : "Internal Server Error"
                                        }
                                        sendData(response)
                                    })
                            }
                            else {
                                response = {
                                    status: 0,
                                    data:{},
                                    msg: 'COURSE_ALREADY_EXISTS'
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
                        let response = {
                            status : 1 ,
                            msg : "Edited Successfully",
                            data : updateData
                        }
                        sendData(response)
                    })
                        .catch((err)=>{
                            let response = {
                                status : 0,
                                data :[],
                                msg : "Internal Server Error"
                            }
                            sendData(response)
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
                        let response = {
                            msg : "Deleted Successfully",
                            data : deleteId ,
                            status : data[0]
                        }
                        sendData(response)
                    })
                        .catch((err)=>{
                            let response = {
                                status : 0,
                                data :[],
                                msg : "Internal Server Error"
                            }
                            sendData(response)
                        })
                }
            }
        })
}
module.exports=init