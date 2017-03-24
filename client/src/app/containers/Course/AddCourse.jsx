import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import NumberInput from 'material-ui-number-input'
import Snackbar from 'material-ui/Snackbar'
import {setCourse,setPagedCourse,setSnackbarOpen,setSnackbarMessage,setValue} from './../../actions/courseAction.jsx'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from './../../store.jsx'
import {connect} from 'react-redux'
import axios from 'axios'
class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle =  this.handleToggle.bind(this);
        this.state = {
            errorText3:"",
            errorText4:"",
            validateNewCourseName : false,
            validateNewCourseDuration:false,
            newCourse:"",
            newDuration:""
        };
        this.onError1 = (error) => {
            let errorText;
            console.log(error);
            switch (error) {
                case 'required':
                    errorText = 'This field is required';
                    break;
                case 'invalidSymbol':
                    errorText = 'You are trying to enter none number symbol';
                    break;
                case 'incompleteNumber':
                    errorText = 'Number is incomplete';
                    break;
                case 'singleMinus':
                    errorText = 'Minus can be use only for negativity';
                    break;
                case 'singleFloatingPoint':
                    errorText = 'There is already a floating point';
                    break;
                case 'singleZero':
                    errorText = 'Floating point is expected';
                    break;
                case 'min':
                    errorText = 'You are trying to enter number less than -10';
                    break;
                case 'max':
                    errorText = 'You are trying to enter number greater than 12';
                    break;
            }
            this.setState({ errorText4: errorText });
        };
        this.addCourseName = this.addCourseName.bind(this)
        this.addCourseDuration = this.addCourseDuration.bind(this)
        this.addCourse = this.addCourse.bind(this)
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    snackbarHandleRequestClose = () => {

        this.props.setSnackbarOpen(false)
    };
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
            course_name : newCourse,
            duration : newDuration
        }).then((response)=>{
            if(response.data.status==1){

                this.props.setSnackbarOpen(true)
                this.props.setSnackbarMessage("Course Added")
                this.props.setValue('a')
                let newCourse = response.data.content
                let course = this.props.courseReducer.course.data

                course.push(newCourse)
                this.props.setCourse(course)
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
                this.props.setPagedCourse(pagedCourses)
            }
            else {
                this.props.setSnackbarMessage(response.data.content)
                this.props.setSnackbarOpen(true)
            }
        })
            .catch((response)=>{
                console.log(response)
            })
    }
    render(){
        console.log('addCourse.jsx')
        const margin = {marginBottom : 10}
        const {state, onChange, onError1, onKeyDown, onValid, onRequestValue} = this;
        const contentStyle = {
            marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
        };

        if (this.state.open) {
            contentStyle.marginLeft = 230;
        }
        return (
            <div>
                <h2 className="headline">Add a course</h2>
                <TextField
                    hintText="Course Name"
                    onChange={this.addCourseName}
                    errorText={this.state.errorText3}
                /><br />
                <NumberInput
                    id="num1"
                    hintText="Duration"
                    required

                    strategy="warn"
                    errorText={this.state.errorText4}
                    onValid={onValid}
                    onChange={this.addCourseDuration}
                    onError={onError1}
                    onRequestValue={onRequestValue} />
                <br />
                <RaisedButton label="Submit"
                              onClick={()=>this.addCourse()}
                              primary={true}
                              className="style"
                              disabled = {!(this.state.validateNewCourseName && this.state.validateNewCourseDuration)}
                />
                <Snackbar
                    open={this.props.courseReducer.snackbarOpen}
                    message={this.props.courseReducer.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.snackbarHandleRequestClose}
                />
            </div>
        );
    }
}
const history = syncHistoryWithStore(browserHistory, store)

const mapStateToProps = (state) => {
    return {
        courseReducer: state.courseReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCourse : (course)=>{
            dispatch(setCourse(course))
        },
        setPagedCourse : (course)=>{
            dispatch(setPagedCourse(course))
        },
        setSnackbarOpen :(data)=>{
            dispatch(setSnackbarOpen(data))
        },
        setSnackbarMessage:(data)=>{
            dispatch(setSnackbarMessage(data))
        },
        setValue:(value)=>{
            dispatch(setValue(value))
        }
    };
};
export  default connect(mapStateToProps,mapDispatchToProps)(AddCourse);










