import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
import AddCourse from './AddCourse.jsx'
import ViewCourse from './ViewCourse.jsx'
require('rc-pagination/assets/index.css');
const Pagination = require('rc-pagination');
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage : 1 ,
            totalPages : 1,
            snackbarMessage : "" ,
            snackbarOpen:false,
            deleteDialog : false,
            value: 'a',
            open: false,
            curCourse:{},
            errorText :"",
            errorText1 :"",
            errorText3:"",
            errorText4:"",
            newCourse:"",
            newDuration:"",
            course :[],
            validateCourseName :true,
            validateCourseDuration : true ,
            validateNewCourseName : false,
            validateNewCourseDuration:false,
        };


        /*bindings*/
        this.setCourseName = this.setCourseName.bind(this)
        this.addCourseName = this.addCourseName.bind(this)
        this.setCourseDuration = this.setCourseDuration.bind(this)
        this.addCourseDuration = this.addCourseDuration.bind(this)
        this.addCourse = this.addCourse.bind(this)
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    pageChange = (currentPage , size) =>{
        this.setState({
            currentPage : currentPage
        })
        let course = this.state.course
        let start = (currentPage-1)*10
        let end = start + 10
        let pagedCourses = []
        for(let index in course){
            if(index>=start && index<end){
                pagedCourses.push(course[index])
            }
        }
        this.setState({
            pagedCourses:pagedCourses
        })
    };
    snackbarHandleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };
    handleDeleteOpen = (index,data) => {
        this.setState({
            curCourse : data
        })
        this.setState({deleteDialog: true});
    };

    handleDeleteClose = () => {
        this.setState({deleteDialog: false});
    };
    handleDeleteCloseWithUpdate = () => {
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/deleteCourse',data).then((response)=>{
            let course = this.state.course
            for(let index in course){
                if(course[index].id==data.id){
                    course.splice(index,1)
                }
            }
            this.setState({
                course : course
            })
            let size= this.state.course
            this.setState({
                totalPages:size
            })
            course = this.state.course
            this.setState({
                currentPage : 1
            })
            this.setState({
                snackbarOpen:true,
                snackbarMessage:"Course Deleted"
            })
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.setState({
                pagedCourses:pagedCourses
            })
        })
            .catch((response)=>{
                console.log(response)
            })
        this.setState({deleteDialog: false});
    };
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    handleOpen = (key,data) => {
        this.setState({open: true});
        this.setState({
            curCourse : data
        })
    };
    handleClose = (key) => {
        this.setState({open: false});

    };
    handleCloseWithEdit = (key) => {
        this.setState({open: false});
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/editCourse',data).then((response)=>{
            let course = this.state.course
            for(let index in course){
                if(course[index].id===data.id){
                    course[index] = data
                }
            }
            this.setState({
                course : course
            })
            let size = course.length
            // let totalPages = Math.floor(size/10) +1
            this.setState({
                totalPages:size
            })
            this.setState({
                currentPage:1
            })
            let pagedCourses = []
            for(let index in course){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.setState({
                pagedCourses:pagedCourses
            })
            this.setState({
                snackbarMessage:"Field Edited Successfully",
                snackbarOpen:true
            })


        })
            .catch((response)=>{
                console.log(response)
            })
    };

    setCourseName(event){
        let course = this.state.curCourse
        let name = event.target.value
        if(name.trim()=='') {
            this.setState({
                errorText1:"Course Name required"
            })
            this.setState({
                validateCourseName:false
            })
        }
        else if(name.length>20){
            this.setState({
                errorText1:"Length Should be less than 20 characters "
            })

            this.setState({
                validateCourseName:false
            })
        }
        else {
            this.setState({
                errorText1:""
            })
            this.setState({
                validateCourseName:true
            })
        }
        this.setState({
            curCourse:{
                id : course.id,
                name : event.target.value ,
                duration :course.duration,
                noOfDept : course.noOfDept
            }
        })
    }
    setCourseDuration(event){
        let course = this.state.curCourse
        let duration = event.target.value
        if(this.state.errorText==undefined || this.state.errorText==""){
            this.setState({
                validateCourseDuration:true
            })
        }
        else
            this.setState({
                validateCourseDuration:false
            })
        this.setState({
            curCourse:{
                id :course.id ,
                name : course.name ,
                duration :event.target.value,
                noOfDept : course.noOfDept
            }
        })
    }
    addCourseName(event){
        let name = event.target.value
        if(name.trim()==''){
            this.setState({
                errorText3:"Course Name required",
                validateNewCourseName : false
            })
        }
        else if(name.length>20){
            this.setState({
                errorText3:"Length should be less than 20 characters",
                validateNewCourseName:false
            })
        }
        else {
            this.setState({
                errorText3:"",
                validateNewCourseName:true,
                newCourse:name
            })
        }
    }
    addCourseDuration(event){
        let duration = event.target.value

        if(duration.trim()==''){
            this.setState({
                validateNewCourseDuration:false
            })
        }
        else if(this.state.errorText4==undefined || this.state.errorText4==""){
            this.setState({
                validateNewCourseDuration:true
            })
        }
        else
            this.setState({
                validateNewCourseDuration:false
            })
        this.setState({
            newDuration : duration
        })
    }
    addCourse(){
        let newCourse = this.state.newCourse
        let newDuration = this.state.newDuration
        axios.post('http://localhost:3166/api/course/addCourse',{
            courseName : newCourse,
            duration : newDuration
        }).then((response)=>{
            if(response.data.status==1){
                this.setState({
                    value : 'a',
                    snackbarOpen : true,
                    snackbarMessage : "Course Added"
                })
                let newCourse = response.data.content
                let course = this.state.course
                course.push(newCourse)
                this.setState({
                    course:course
                })
                let size = course.length
                // let totalPages = Math.floor(size/10) +1
                this.setState({
                    totalPages:size
                })
                this.setState({
                    currentPage:1
                })
                let pagedCourses = []
                for(let index in course){
                    if(index<10){
                        pagedCourses.push(course[index])
                    }
                }
                this.setState({
                    pagedCourses:pagedCourses
                })
            }
            else {
                this.setState({
                    snackbarOpen  : true ,
                    snackbarMessage : response.data.content,
                })
            }
        })
            .catch((response)=>{
                console.log(response)
            })
    }

    componentWillReceiveProps(props){
        this.props = props
    }

    render(){
        const dialogActions = [
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.handleDeleteClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.handleDeleteCloseWithUpdate}
            />,
        ];
        const {onError,onValid, onRequestValue} = this;

        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="View" value="a">
                        <ViewCourse/>
                    </Tab>
                    <Tab label="Add" value="b">
                        <AddCourse/>
                    </Tab>
                </Tabs>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.snackbarHandleRequestClose}
                />
            </div>
        )
    }
}
(Course).childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default Course