/**
 * Created by mustang on 30/03/17.
 */
const studentReducer = (state={
                            csvToJS:{
                                filename:'no file selected',
                                content:''
                            },
                            dialogOpen:false,
                            error:'',
                            addedStudent:{},
                            initialData:{
                                data:{
                                    departments:[],
                                    semesters:[],
                                    batches:[]
                                },
                                message:''
                            },
                            allStudentData:{
                                data:{
                                    students:[]
                                }
                            },
                           studentData:{}
                        },action)=>{
    switch(action.type){
        case 'GET_DATA_FULFILLED':
            console.log('-------action-------',action.payload)
            state={
                ...state,
                initialData:action.payload
            }
            console.log('-------initial data-------',state.initialData)
            break
        case 'GET_DATA_REJECTED':
            state={
                ...state,
                error:action.payload
            }
            break
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
                addedStudent:action.payload
            }
            break
        case 'GET_FILTER_DATA_FULFILLED':
            state={
                ...state,
                allStudentData:action.payload
            }
            break
        case 'ADD_STUDENT_REJECTED':
            state={
                ...state,
                addedStudent:action.payload,
                error:'error while adding data'
            }
            break
        case 'OPEN_DIALOG':
            state={
                ...state,
                dialogOpen:action.payload
            }
            break
        default:
            break
    }
    return state
}
export default studentReducer
