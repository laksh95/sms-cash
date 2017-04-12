/**
 * Created by mustang on 30/03/17.
 */
const studentReducer = (state={
                            csvToJS:{
                                filename:'no file selected',
                                content:''
                            },
                            error:'',
                            initialData:{"data": {
                                "departments": [
                                    {
                                        "id": 1,
                                        "name": "Information Technology",
                                        "abbreviatedName": "IT"
                                    },
                                    {
                                        "id": 2,
                                        "name": "Computer Science",
                                        "abbreviatedName": "CSE"
                                    },
                                    {
                                        "id": 3,
                                        "name": "BioTech",
                                        "abbreviatedName": "BIO"
                                    },
                                    {
                                        "id": 4,
                                        "name": "Electrical",
                                        "abbreviatedName": "ECE"
                                    }
                                ],
                                "semesters": [
                                    {
                                        "name": 1,
                                        "type": "monsoon"
                                    },
                                    {
                                        "name": 2,
                                        "type": "spring"
                                    },
                                    {
                                        "name": 3,
                                        "type": "monsoon"
                                    },
                                    {
                                        "name": 4,
                                        "type": "spring"
                                    },
                                    {
                                        "name": 5,
                                        "type": "monsoon"
                                    },
                                    {
                                        "name": 6,
                                        "type": "spring"
                                    },
                                    {
                                        "name": 7,
                                        "type": "monsoon"
                                    },
                                    {
                                        "name": 8,
                                        "type": "spring"
                                    }
                                ]
                            },
                                "message": "successfull"
                            },
                            studentData:{"data": {
                                "students": [
                                    {
                                        "admissionNo": 1111,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 1,
                                        "deptName": "Information Technology",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    },
                                    {
                                        "admissionNo": 1121,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 2,
                                        "deptName": "Computer Science",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    },
                                    {
                                        "admissionNo": 1131,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 3,
                                        "deptName": "Bio Tech",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    }, {
                                        "admissionNo": 1112,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 1,
                                        "deptName": "Information Technology",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    }, {
                                        "admissionNo": 1122,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 2,
                                        "deptName": "Computer Science",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    }, {
                                        "admissionNo": 1132,
                                        "batchId": 1,
                                        "batchName": 2017,
                                        "deptId": 3,
                                        "deptName": "Bio Tech",
                                        "name": "admin",
                                        "semester": 1,
                                        "semesterId": 1,
                                        "sectionId": 1,
                                        "section": "A"
                                    }
                                ]
                            },
                                "message": "successful"}
                        },action)=>{
    switch(action.type){
        case 'INGEST_FILE_BEGIN_FULFILLED':
            state={
                ...state,
                csvToJS:{
                    filename:action.payload.filename
                }
            }
            break
        case 'INGEST_FILE_SUCCESS_FULFILLED':
            state={
                ...state,
                csvToJS:{
                    filename:action.payload.filename,
                    content:action.payload.fileContent
                }
            }
            break
        case 'INGEST_FILE_FAILURE_REJECTED':
            state={
                ...state,
                error:action.payload.error
            }
            break
        case 'ADD_STUDENT_FULFILLED':
            state={
                ...state,
                studentInfo:action.payload
            }
            break
        case 'ADD_STUDENT_REJECTED':
            state={
                ...state,
                error:'error while adding data'
            }
            break
        default:
            break
    }
    return state
}
export default studentReducer
