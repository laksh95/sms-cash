import axios from 'axios'
let serverAddress = 'http://localhost:3166'
const utils = {
    addCourse : (data) => {
        let url = serverAddress + '/api/course/addCourse'
        return axios.post(url,data)
    },
    getCourses : () => {
        let url = serverAddress + '/api/course/getCourses'
        return axios.get(url)
    },
    editCourse : (data) => {
        let url = serverAddress + '/api/course/editCourse'
        return axios.put(url,data)
    },
    deleteCourse : (data) => {
        let url = serverAddress + '/api/course/deleteCourse'
        return axios.put(url,data)
    }
}
export default utils