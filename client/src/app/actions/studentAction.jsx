/**
 * Created by mustang on 30/03/17.
 */
import {readCsv} from '../utils/fileOps'
import studentApi from '../utils/api/student'

const ingestFileBegin = (filename) => ({
    type: 'INGEST_FILE_BEGIN_FULFILLED',
    payload: {
        filename
    }
})
export const getInitialData = (courseId)=>{
    return{
        type: 'GET_DATA',
        payload:studentApi.getDepartmentList(courseId)
            .then((data)=>{
                return data
            })
    }
}

export const addStudent = (studentInfo)=>{
    return{
        type:'ADD_STUDENT',
        payload: studentApi.addStudent(studentInfo)
            .then((data)=>{
                return data
            })
    }
}
const ingestFileSuccess = (filename, fileContent) => ({
    type: 'INGEST_FILE_SUCCESS_FULFILLED',
    payload:{
        filename,
        fileContent
    }
})

const ingestFileFailure = (filename, error) => ({
    type: 'INGEST_FILE_FAILURE_REJECTED',
    payload:{
        filename,
        error
    }
})
export const addBulkStudent = (files)=>{
    return (dispatch)=>{
        const file=files[0]
        const fileName=file.name
        const reader=new FileReader()
        reader.onloadstart = ()=>{
            dispatch(ingestFileBegin(fileName))
        }
        reader.onload = (fileEvent)=>{
            const fileContent=readCsv(fileEvent.target.result)
            dispatch(ingestFileSuccess(fileName, fileContent))
        }
        reader.onerror = (error) => {
            dispatch(ingestFileFailure(fileName, error.toString()))
        }
        reader.readAsText(file)
    }
}