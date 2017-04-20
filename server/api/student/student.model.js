let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

let departments=[];
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
          where: {
            id:data.batchId,
          },
        },
        {
          model:db.department,
          attributes:['id','name','abbreviated_name'],
          where: {
            id:data.deptId,
          },
        },
        {
          model:db.parent,
          where: {
            id:data.parentId,
          },
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
              model:db.semester,
              where:{
                name:data.semester,
                status:'t'
              }
            }]
          }]
        }
     ]
  })
})

let fetchBatch=(db)=>{
    return db.batch.findAll({
        attributes:['id','name'],
        where:{
            status:'t'
        }
    })
}
let fetchStudentsOnSemDeptBatch=((db,limit,offset,where)=>{
  console.log("inside fetchStudentsOnSemDeptBatch ")
  return db.student.findAll({
      attributes: ['admission_no'],
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
          model:db.user_detail,
          attributes:['name'],
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
        where: {
          course_id: courseId,
          status: 't',
      }
    })
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
          student.belongsToMany(section,{
           through : "student_section_allocation"
          });
        },
        totalStudent: function(db, cb){ //counting number of students
          let student = db.student

          return student.findAndCountAll().then((data)=>{
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
            // console.log("data in getStudents---------------------------->", data)
              console.log("hello",data)
              let students=[{admissionNo:''}];
              data.map((list,index)=>{
                  console.log("list----------------------------------->",list)
                  let student=list.dataValues;
                  students[index].admissionNo=student.admission_no;
                  students[index].batchId=student.batch.dataValues.id;
                  students[index].batchName=student.batch.dataValues.name;
                  students[index].deptId=student.department.dataValues.id;
                  students[index].deptName=student.department.dataValues.name;
                  students[index].name=student.user_detail.dataValues.name;
                  students[index].semester=list.sections[0].dataValues.curriculum.dataValues.semester.dataValues.name
                  students[index].semesterId=list.sections[0].dataValues.curriculum.dataValues.semester.dataValues.id
                  students[index].sectionId=list.sections[0].dataValues.id;
                  students[index].section=list.sections[0].dataValues.name;
              })
              sendData={
                  status:200,
                  data:{
                      students:students
                  },
                  msg:'successful'
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
            console.log("data in student Details---------------------->",data.dataValues.sections[0].dataValues.curriculum.dataValues);
            details={
              batchId: data.dataValues.batch.dataValues.id,
              batchName: data.dataValues.batch.dataValues.name,
              departmentId: data.dataValues.department.dataValues.id,
              departmentName:data.dataValues.department.dataValues.name,
              departmentAbbreviatedName: data.dataValues.department.dataValues.abbreviated_name,
              parentId: data.dataValues.parent.dataValues.id,
              motherName: data.dataValues.parent.dataValues.mother_name,
              fatherName: data.dataValues.parent.dataValues.father_name,
              parentEmailId:data.dataValues.parent.dataValues.email_id,
              parentContactNumber:data.dataValues.parent.dataValues.contact_number,
              parentCountryCode:data.dataValues.parent.dataValues.country_code,
              id:data.dataValues.user_detail.dataValues.id,
              username:data.dataValues.user_detail.dataValues.username,
              admissionNo:data.dataValues.admission_no,
              password:data.dataValues.user_detail.dataValues.fatherName,
              name:data.dataValues.user_detail.dataValues.fatherName,
              dateOfBirth:data.dataValues.user_detail.dataValues.date_of_birth,
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
              semesterName:data.dataValues.sections[0].dataValues.curriculum.dataValues.semester.dataValues.name,
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
        }
      },
   }
  );
    return student;
}