let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection
let totp = require('totp-generator')
let mailer = require('nodemailer')
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
                /*confirmation for otp*/
                generateOTP:(data,db,cb)=>{
                   const token = data.authorization.split(' ')[1];
                   let otp = totp('JBSWY3DPEHPK3PXP')
                    db.otp.update({
                        status:'f'
                    },{
                        where:{token:token}
                    }).then((response)=>{
                        db.otp.create({
                            token:token,
                            otp:otp
                        }).then((data)=>{
                            let transporter = mailer.createTransport({
                                service:'gmail',
                                auth:{
                                    user:'ignore.john2017@gmail.com',
                                    pass:'madman2017'
                                }
                            })
                            let message={
                                from:'"John Doe" <ignore.john2017@gmail.com>',
                                to: 'laksh@cronj.com',
                                subject:'Email Verification',
                                text:' This is the 6 digit OTP which will expire in 5 minutes.' + otp.toString()
                            }
                            transporter.sendMail(message,(error, info)=>{
                                let response = {}
                                if(error){
                                    response = {
                                        data:[],
                                        msg:'internal server error',
                                        status:0
                                    }
                                }
                                else{
                                    response = {
                                        data:data,
                                        msg:'added successfully',
                                        status:1
                                    }
                                }
                                cb(response)
                            })
                        })
                    })
                },
                checkOTP:(db,data,authorization)=>{
                   let otp = db.otp;
                   const token = authorization.split(' ')[1];
                   let number = data.otp;
                   return otp.findOne({
                       attributes:['token'],
                       where:{
                           token,
                           otp:number
                       }
                   })
                },
                /*get all the courses*/
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
                /*add a new course */
                addNewCourse:(db,setData,sendData)=>{
                    let course=db.course
                    setData.course_name = setData.course_name.toUpperCase()
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
                /*edit a current course*/
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
                /*delete a course*/
                deleteCourse:(db,data,sendData)=>{
                    let course = db.course
                    let id = data.data
                    course.update({
                        status:'f'
                    },{
                        where:{
                            id:data.data,
                            status:'t'
                        }
                    }).then((deletedData)=>{
                        if(deletedData[0] !== 0) {
                            let response = {
                                data:id,
                                status: 1
                            }
                            sendData(response)
                        }
                        else{
                            let response = {
                                status : 0,
                                data :[]
                            }
                            sendData(response)
                        }
                    })
                        .catch((err)=>{
                            let response = {
                                status : 0,
                                data :[]
                            }
                            sendData(response)
                        })
                }
            }
        })
}
module.exports=init
