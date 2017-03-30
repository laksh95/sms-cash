/**
 * Created by mustang on 30/03/17.
 */
const csvToJs={
    filename:'no file selected',
    content:'',
    fileError:''
}
const addBulkReducer = (state=csvToJs,action)=>{
    switch(action.type){
        case 'INGEST_FILE_BEGIN_FULFILLED':
            state={
                ...state,
                filename:action.payload.filename
            }
            break
        case 'INGEST_FILE_SUCCESS_FULFILLED':
            state={
                ...state,
                filename:action.payload.filename,
                content:action.payload.fileContent
            }
            break
        case 'INGEST_FILE_FAILURE_REJECTED':
            state={
                ...state,
                fileError:action.payload.error
            }
            break
        default:
            break
    }
    return state
}
export default addBulkReducer
