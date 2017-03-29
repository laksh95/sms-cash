import axios from 'axios'

export function getDepartment(courseId){
	return {
		type: "GET_DEPARTMENTS",
		payload: axios.post('http://192.168.1.176:3166/api/department/getDepartments',courseId)
			.then((response) => {
				return response.data
		})
	}
}

export function getCourse(){
  return {
    type: "GET_COURSES",
    payload: axios.get('http://192.168.1.176:3166/api/course/getCourses')
      .then((response) => {
        return response.data
      })
  }
}

export function getBatch(courseId){
  return {
    type: "GET_BATCHES",
    payload: axios.post('http://localhost:1234/api/course/getBatch',courseId)
      .then((response) => {
        return response.data
      })
  }
}

export function getSession(){
  return {
    type: "GET_SESSIONS",
    payload: axios.get('http://localhost:1234/api/course/getSession')
      .then((response) => {
        return response.data
      })
  }
}
