/**
 * Created by mustang on 30/03/17.
 */
const studentReducer = (state={
                            csvToJS:{
                                filename:'no file selected',
                                content:''
                            },
                            error:'',
                            initialData:{},
                            studentInfo:{}
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
