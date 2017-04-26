let data = require('./../../config/db');
var moment = require('moment');
var bcrypt = require('bcrypt');
const saltRounds = 10;
let sequelize = data.sequelize;
let connection = data.connection;
let departments=[];
let mailer = require('nodemailer')
let passwordOrig='';
let fetchDepartment=((courseId,db)=>{
    console.log("in fetchDepartment",courseId);
     return db.department.findAll({
        attributes: ['id', 'name', 'abbreviated_name'],
        where: {
          course_id: courseId,
          status: 't'
        }
      })
})
let fetchStudentsDetails=((db,data)=>{
  return db.student.findOne({
      attributes: ['id','admission_no'],
      where:{
        id:data.studentId
      },
      include:[{
          model:db.batch,
          attributes:['id','name'],
        },
        {
          model:db.department,
          attributes:['id','name','abbreviated_name'],
        },
        {
          model:db.parent,
        },
        {
          model:db.user_detail,
        },
        {
          model:db.section,
          attributes:['id','name'],
          include:[{
            model:db.curriculum,
            include:[{
              model:db.semester
            }]
          }]
        }
     ]
  })
})

let fetchBatch=((db)=>{
    return db.batch.findAll({
        attributes:['id','name'],
        where:{
            status:'t'
        }
    })
})

let fetchStudentsOnSemDeptBatch=((db,limit,offset,where)=>{
  return db.student.findAll({
      attributes: ['id','admission_no'],
      where: where.where,
      include:[
        {
          model:db.batch,
          attributes:['id','name'],
        },
        {
          model:db.department,
          attributes:['id','name'],
        },
        {
          model:db.parent,
        },
        {
          model:db.user_detail,
          attributes:['name','username'],
        },
        {
          model:db.section,
          attributes:['id','name'],
         include:where.include
        }
     ]
  })
})
let fetchSemester=((courseId,db)=>{
    console.log("in fetchSemesterOfDepartment");
    return db.semester.findAll({
        limit:8,
        where: {
          course_id: courseId,
          status: 't',
      }
    })
})
let addUser=((data,db)=>{
  console.log("inside add user then---------------------------->")
  let name=data.name;
  let removeSpaces=name.trim();
  let uname='';
  let nameArray=removeSpaces.split(" ");
  if(nameArray[1]!=undefined||nameArray[1]!=null){
    name=nameArray[0];
    uname=nameArray[0]+"_"+nameArray[1];
  }
  else{
    name=uname=nameArray[0]
  }
    return db.user_detail.findAndCountAll({
      where:{
        name:{
          $iLike: name+'%'
        },     
      }
    }).then((users)=>{
      console.log("usersssss-------------->",moment(data.dateOfBirth).year());
      let yearOfBirth=moment(data.dateOfBirth).year();
      let username=uname+"_"+yearOfBirth+(users.count+1)
      let password=''
      let myPlaintextPassword=''
      for (var ch in name) {
              console.log("usersssss uname-------------->",name);

          myPlaintextPassword=myPlaintextPassword+name[ch]+Math.floor(Math.random() * 10);
                console.log("usersssss password-------------->",myPlaintextPassword);

      }
      passwordOrig=myPlaintextPassword
      return bcrypt.hash(myPlaintextPassword, saltRounds).
        then((password)=> {
          return db.user_detail.create({
            username:username,
            password: password,
            name:data.name,
            date_of_birth: data.dateOfBirth,
            profile_pic_url: data.profilePicUrl,
            gender:data.gender ,
            permanent_address:data.permanentAddress ,
            current_address:data.currentAddress ,
            email_id:data.emailId ,
            contact_number:data.contactNo ,
            country_code_one:data.countryCodeOne,
            alternate_number:data.alternateContactNo ,
            country_code_two:data.countryCodeTwo ,
            status:'t'
          })
        });
    }) 
  })
  let addParent=((data,db)=>{
    return db.parent.create({
      mother_name:data.motherName ,
      father_name:data.fatherName ,
      email_id:data.parentEmailId,
      contact_number:data.parentContactNumber,
      country_code:data.parentCountryCode,
      status:'t'
    })
})
let addStudent=((data,db)=>{
  let admissionNumber=0;
  return db.student.max('admission_no')
  .then((max)=> {
    if(max==0){
      admissionNumber=1111;
    }
    else{
      admissionNumber=max+1
    }
   return db.student.create({
      admission_no: admissionNumber,
      status:'t',
      user_detail_id:data.userId,
      department_id:data.deptId,
      batch_id:data.batchId,
      parent_id:data.parentId,
    })
  })
})
let addStudentToSection=((data,db)=>{ 
  return db.student_section_allocation.create({
      section_id:1,
      student_id:data.id,
      status:'t'
    })
})
let getSemesterBySection=((id,db)=>{
  return db.section.findOne({
      where:{
        id:id
      },
      include:[{
        model:db.curriculum,
          include:[{
            model:db.semester
          }]
        }
      ]
  })
})
let editUserDetails=((data,db)=>{
  return db.user_detail.update(
    {
      name:data.name,
      permanent_address:data.permanentAddress,
      current_address:data.currentAddress,
      email_id:data.emailId ,
      contact_number:data.emailId,
      country_code_one:data.countryCodeOne, 
      alternate_number:data.alternateNumber,
      country_code_two:data.countryCodeTwo
    },
    {
      where:{
        username:data.username
      }
    }
  )
})
let editParentDetails=((data,db)=>{
  return db.parent.update(
    {
      email_id:data.parentEmailId ,
      contact_number:data.parentContactNumber,
      country_code:data.parentCountryCode
    },
    {
      where:{
        id:data.parentId
      }
    }
  )
})
let deleteUserDetails=((data,db)=>{
  return db.user_detail.update(
    {
      status:'f'
    },
    {
      where:{
        username:data.username
      }
    }
  )
})
let deleteParentDetails=((data,db)=>{
  return db.parent.update(
    {
      status:'f'
    },
    {
      where:{
        id:data.parentId
      }
    }
  )
})
let countParents=((data,db)=>{
  return db.student.findAndCountAll(
    {
      where:{
        parent_id:data.parentId
      }
    }
  )
})
let deleteStudentDetails=((data,db)=>{
  return db.student.update(
    {
      status:'f'
    },
    {
      where:{
        id:data.studentId
      }
    }
  )
})
let deleteStudentSectionAllocationDetails=((data,db)=>{
  return db.student_section_allocation.update(
    {
      status:'f'
    },
    {
      where:{
        student_id:data.studentId,
        section_id:data.sectionId
      }
    }
  )
})
module.exports=function(){
  let student= connection.define('student',{
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      admission_no: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      status:{
        type:sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      }
   },
    {
      classMethods: {
        associate: function(models){
         let student = models.student;
         let user = models.user_detail;
         let department = models.department;
         let parent = models.parent;
         let batch = models.batch;
         let section = models.section;
          student.belongsTo(user,{
            foreignKey : 'user_detail_id'
         });
          student.belongsTo(department,{
            foreignKey : 'department_id'
         });
          student.belongsTo(parent,{
           foreignKey : 'parent_id'
         });
          student.belongsTo(batch,{
            foreignKey : 'batch_id'
         });
        },
        totalStudent: function(db, cb){
          let student = db.student
          return student.findAndCountAll()
        },
        getInitialData:(db,courseId,cb)=>{
          let initialData=[];
          let departments=[];
          fetchDepartment(courseId,db)
            .then((data) => {
                data.map((list,i)=>{
                  let department={
                    id:list.dataValues.id,
                    name:list.dataValues.name,
                    abbreviatedName:list.dataValues.abbreviated_name
                  };
                  departments.push(department);
                })
                  fetchSemester(courseId,db)
                  .then((data)=> {
                      console.log("data[0]------------------------------>", data[0].dataValues)
                      let semester = {};
                      let semesters = [];
                      let batches = []
                      data.map((list, i) => {
                          let semester = {
                              name: list.dataValues.name,
                              type: list.dataValues.type,
                              id:list.dataValues.id
                          }
                          semesters[i] = semester;
                      })
                      fetchBatch(db)
                          .then((data) => {
                              data.map((list, i) => {
                                  let batch = {
                                      name: list.dataValues.name,
                                      id: list.dataValues.id
                                  }
                                  batches[i] = batch
                              })
                              initialData = {
                                  status: 200,
                                  data: {
                                      departments: departments,
                                      semesters: semesters,
                                      batches
                                  },
                                  msg: 'successful'
                              }
                              cb(initialData)
                          }).catch((error) => {
                          console.log("in catch", error.toString());
                          initialData = {
                              status: 500,
                              msg: 'Internal Server Error'
                          }
                          cb(initialData)
                      })
                  })  .catch((error)=>{
                      console.log("in catch------->",error.toString());
                      initialData={
                          status:500,
                          msg:'Internal Server Error'
                      }
                      cb(initialData)
                  })
              }).catch((error)=>{
                  console.log("in catch outer",error.toString());
                  initialData={
                    status:500,
                    msg:'Internal Server Error'
                  }
                  cb(initialData)
                })
        },
        getStudents:(db, limit,offset,whereAttribute,cb)=>{
          fetchStudentsOnSemDeptBatch(db,limit,offset,whereAttribute)
          .then((data)=>{
              let sendData={}
              var studentsList=[];
              console.log("data of =============>", data[0])
              if(data[0]!=undefined){
                data.map((list,index)=>{
                 // console.log("list----------------------------------->",list.dataValues)
                  let student=list.dataValues;
                  console.log(typeof studentsList[0])
                  let newStudent={
                    admissionNo:student.admission_no,
                    username:student.user_detail.dataValues.username,
                    studentId:student.id,
                    batchId:student.batch.dataValues.id,
                    batchName:student.batch.dataValues.name,
                    deptId:student.department.dataValues.id,
                    deptName:student.department.dataValues.name,
                    name:student.user_detail.dataValues.name,
                    semester:list.sections[0].dataValues.curriculum.dataValues.semester.dataValues.name,
                    semesterId:list.sections[0].dataValues.curriculum.dataValues.semester.dataValues.id,
                    sectionId:list.sections[0].dataValues.id,
                    section:list.sections[0].dataValues.name,
                    parentId:student.parent.dataValues.id,

                  }
                  studentsList.push(newStudent)
                })
                sendData={
                  status:200,
                  data:studentsList,
                  msg:'successful'
                }
              } 
              else{
                sendData={
                  status:200,
                  msg:'No Rows Found'
                }
              }               
                cb(sendData)
              })
              .catch((error)=>{
                console.log("in catch outer of get students",error.toString());
                sendData={
                  status:500,
                  msg:'Internal Server Error'
                }
                cb(sendData)
              })
        },
        getStudentDetails:(db,data,cb)=>{
          let details={}
          fetchStudentsDetails(db,data)
          .then((data)=>{
            let studentId=data.dataValues.id;
              console.log("dats===================>",data.dataValues.parent.dataValues)
            details={
              studentId:studentId,
              batchId: data.dataValues.batch.dataValues.id,
              batchName: data.dataValues.batch.dataValues.name,
              departmentId: data.dataValues.department.dataValues.id,
              departmentName:data.dataValues.department.dataValues.name,
              departmentAbbreviatedName: data.dataValues.department.dataValues.abbreviated_name,
              parentId: data.dataValues.parent.dataValues.id,
              motherName: data.dataValues.parent.dataValues.mother_name,
              fatherName: data.dataValues.parent.dataValues.father_name,
              parentEmailId:data.dataValues.parent.dataValues.email_id,
              parentId:data.dataValues.parent.dataValues.id,
              parentContactNumber:data.dataValues.parent.dataValues.contact_number,
              parentCountryCode:data.dataValues.parent.dataValues.country_code,
              username:data.dataValues.user_detail.dataValues.username,
              admissionNo:data.dataValues.admission_no,
              password:data.dataValues.user_detail.dataValues.fatherName,
              name:data.dataValues.user_detail.dataValues.name,
              dateOfBirth:(data.dataValues.user_detail.dataValues.date_of_birth).toDateString(),
              profilePicUrl:data.dataValues.user_detail.dataValues.profile_pic_url,
              gender:data.dataValues.user_detail.dataValues.gender,
              permanentAddress:data.dataValues.user_detail.dataValues.permanent_address,
              currentAddress:data.dataValues.user_detail.dataValues.current_address,
              emailId:data.dataValues.user_detail.dataValues.email_id,
              contactNumber:data.dataValues.user_detail.dataValues.contact_number,
              countryCodeOne:data.dataValues.user_detail.dataValues.country_code_one,
              alternateNumber:data.dataValues.user_detail.dataValues.alternate_number,
              countryCodeTwo:data.dataValues.user_detail.dataValues.country_code_two,
              sectionId:data.dataValues.sections[0].dataValues.id,
              sectionName:data.dataValues.sections[0].dataValues.name,
              curriculumId:data.dataValues.sections[0].dataValues.curriculum.dataValues.id,
              curriculumName:data.dataValues.sections[0].dataValues.curriculum.dataValues.name,
              semesterId:data.dataValues.sections[0].dataValues.curriculum.dataValues.semester.dataValues.id,
              semesterType:data.dataValues.sections[0].dataValues.curriculum.dataValues.semester.dataValues.type,
              semesterName:data.dataValues.sections[0].dataValues.curriculum.dataValues.semester.dataValues.name
            }
            sendData={
              data:details,
              status:200,
              msg:"successful"
            }
            cb(sendData)
          })
          .catch((error)=>{
            console.log("in catch outer of get students details",error.toString());
            sendData={
              status:500,
              msg:'Internal Server Error'
            }
          })
        },
        addOneStudent:(db,data,cb)=>{
          let allDetailsOfStudent={}
          let userAdded,studentAdded;
          addUser(data,db)
          .then((user)=>{
            userAdded=user;
            return addParent(data,db)
          })
          .then((parent)=>{ 
            data.parentId=parent.id;
            data.userId=userAdded.id;          
            return addStudent(data,db)
          })
          .then((student)=>{
            studentAdded=student;          
            return addStudentToSection(student, db)
          })
          .then((studentSection)=>{
            return getSemesterBySection(studentSection.section_id,db)
          })
          .then((section)=>{     
              let transporter = mailer.createTransport({
                  service:'gmail',
                  auth:{
                      user:'ignore.john2017@gmail.com',
                      pass:'madman2017'
                      }
                  })
              let message={
                  from:'"John Doe" <ignore.john@gmail.com>',
                  to: data.emailId,
                  subject:'Email Verification',
                  text:'Dear Student, your login credentials: Username =' + userAdded.username +' password:'+ passwordOrig
              }
              console.log("message=============>", message)
              transporter.sendMail(message,(error, info)=>{
                let response = {}
                  if(error){
                      response = {
                        data:[],
                        msg:'internal server error',
                        status:0
                      }
                  }
                })
              allDetailsOfStudent={
                data:{
                  admissionNo:studentAdded.admission_no,
                  username:userAdded.username,
                  studentId:studentAdded.id,
                  name:userAdded.name,
                  batchId:data.batchId,
                  batchName:data.batchName,
                  deptId:data.deptId,
                  deptName:data.deptName,
                  sectionId:section.id ,
                  section: section.name,
                  semesterId:section.dataValues.curriculum.dataValues.semester.dataValues.id,
                  semester:section.dataValues.curriculum.dataValues.semester.dataValues.name
                },
                status:200,
                msg:"Done"
              }

              cb(allDetailsOfStudent)
          })
          .catch((error)=>{
            console.log("error",error)
            sendData={
              status:500,
              msg:'Internal Server Error'
            }
            cb(sendData)
          })
        },
        addBulkStudents:(db,data,cb)=>{
          let allStudents=[]
            return connection.transaction((t)=>{
              for(var studentIterator in data){
                let allDetailsOfStudent={}
                let userAdded,studentAdded;
                addUser(data,db)
                .then((user)=>{
                  userAdded=user;
                  return addParent(data,db,t)
                })
                .then((parent)=>{ 
                  data.parentId=parent.id;
                  data.userId=userAdded.id;          
                  return addStudent(data,db,t)
                })
                .then((student)=>{
                  studentAdded=student;          
                  return addStudentToSection(student, db,t)
                })
                .then((studentSection)=>{
                  return getSemesterBySection(studentSection.section_id,db,t)
                })
                .then((section)=>{
                    let transporter = mailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:'ignore.john2017@gmail.com',
                            pass:'madman2017'
                            }
                        })
                    let message={
                        from:'"John Doe" <ignore.john@gmail.com>',
                        to: data.emailId,
                        subject:'Email Verification',
                        text:'Dear Student, your login credentials: Username =' + userAdded.username +' password:'+ passwordOrig
                    }
                    console.log("message=============>", message)
                    transporter.sendMail(message,(error, info)=>{
                      let response = {}
                        if(error){
                            response = {
                              data:[],
                              msg:'internal server error',
                              status:0
                            }
                        }
                      })
                    allDetailsOfStudent={
                      data:{
                        admissionNo:studentAdded.admission_no,
                        username:userAdded.username,
                        studentId:studentAdded.id,
                        name:userAdded.name,
                        batchId:data.batchId,
                        batchName:data.batchName,
                        deptId:data.deptId,
                        deptName:data.deptName,
                        sectionId:section.id ,
                        section: section.name,
                        semesterId:section.dataValues.curriculum.dataValues.semester.dataValues.id,
                        semester:section.dataValues.curriculum.dataValues.semester.dataValues.name
                      },
                      status:200,
                      msg:"Done"
                    }
                    allStudents.push(allDetailsOfStudent);
                })
              
              }
            })
            .then((addedAll)=>{
                sendData={
                  status:200,
                  data:allStudents,
                  msg:'Successfull Insertion'
                }
            })
            .catch((error)=>{
                sendData={
                  status:500,
                  msg:'Internal Server Error'
                }
              })
          
        },
        editStudentDetails:(db,data,cb)=>{
          editUserDetails(data, db)
          .then((user)=>{
              console.log("user updated--->",user)
              return editParentDetails(data, db)
          })
          .then((parent)=>{
              console.log("parent updated--->",parent)
              sendData={
                status:200,
                data:data,
                msg:'Done'
              }
              cb(sendData)
          })
           .catch((error)=>{
              console.log("error",error)
              sendData={
                status:500,
                msg:'Internal Server Error'
              }
              cb(sendData)
            })
        },
        deleteStudentDetails:(db,data,cb)=>{
          countParents(data, db)
          .then((parentCount)=>{
            console.log("user updated--->",parentCount)
            if(parentCount.count>1)
             {
              return deleteStudentSectionAllocationDetails(data, db)
            }
            else{
              let allData={}
              deleteStudentSectionAllocationDetails(data, db)
              .then((allocate)=>{
                  console.log("user updated--->",allocate)
                  allData.allocate=allocate
                  return deleteStudentDetails(data, db)
                })
              .then((studentSection)=>{
                  console.log("user updated--->",studentSection)
                allData.studentSection=studentSection
                return deleteParentDetails(data, db)
              })
              .then((parentDeleted)=>{
                  console.log("user updated--->",parentDeleted)
                allData.parentDeleted=parentDeleted
                return deleteUserDetails(data, db)
              })
              .then((userDeleted)=>{
                  console.log("parent updated--->",userDeleted)
                  if(allData.allocate==1&&allData.studentSection==1&&allData.parentDeleted==1&&userDeleted==1){
                      sendData={
                        status:200,
                        data:data,
                        msg:'Deleted Successfully'
                    }
                  }
                  else{
                    sendData={
                      status:500,
                      msg:'Internal Server Error'
                    }
                  }                  
                  cb(sendData)
              })
              .catch((error)=>{
                console.log("error",error)
                sendData={
                  status:500,
                  msg:'Internal Server Error'
                }
                cb(sendData)
              })
            }
          })
         .catch((error)=>{
            console.log("error",error)
            sendData={
              status:500,
              msg:'Parent Already Exists'
            }
            cb(sendData)
          })
        }
      },
   }
  );
    return student;
}
