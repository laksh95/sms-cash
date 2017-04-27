import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import NumberInput from 'material-ui-number-input'
import Snackbar from 'material-ui/Snackbar'
import {setCourse,setPagedCourse,setSnackbarOpen,setSnackbarMessage,setValue,getCourses,editCourse,deleteCourse,addCourse} from '../../actions/courseActions.js'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from './../../store'
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
    addCourseName = (event) =>{
        let name = event.target.value
        let specialCharacter = name.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
        let numCharacter=name.match(/\d+/g)
        if(name.trim()==''){
            this.setState({
                errorText3:"",
                newCourse : "",
                validateNewCourseName : false
            })
        }
        else if(specialCharacter !== null){
            this.setState({
                errorText3:'Input cannot contain Special Character',
                validateNewCourseName:false
            })
        }
        else if(numCharacter !== null){
            this.setState({
                errorText3:'Input cannot contain Numerical Value',
                validateNewCourseName:false
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
    addCourseDuration = (event) => {
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
    addCourse = () => {
        let newCourse = this.state.newCourse
        let newDuration = this.state.newDuration
        this.props.addCourse({
            course_name : newCourse,
            duration : newDuration
        })
        this.setState({
            newCourse : "",
            newDuration : "",
            validateNewCourseName : false,
            validateNewCourseDuration:false,

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
            <div className="addCourse">
                <form onSubmit={()=>this.addCourse()}>
                    <h2 className="headline">Add a course</h2>
                    <TextField
                        hintText="Course Name"
                        onChange={this.addCourseName}
                        errorText={this.state.errorText3}
                        value = {this.state.newCourse}
                    /><br/>
                    <NumberInput
                        id="num"
                        value ={this.state.newDuration}
                        hintText="Duration"
                        defaultValue=""
                        strategy="warn"
                        errorText={this.state.errorText4}
                        onValid={onValid}
                        onChange={this.addCourseDuration}
                        onError={onError1}
                        onRequestValue={onRequestValue} />
                    <br />
                    <RaisedButton label="Submit"
                                  type="submit"
                                  onClick={()=>this.addCourse()}
                                  primary={true}
                                  className="style"
                                  disabled = {!(this.state.validateNewCourseName && this.state.validateNewCourseDuration)}
                    />
                </form>
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
        },
        getCourses:()=>{
            dispatch(getCourses())
        },
        addCourse:(data) =>{
            dispatch(addCourse(data))
        },
        editCourse:(data) =>{
            dispatch(editCourse(data))
        },
        deleteCourse:(data) =>{
            dispatch(deleteCourse(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddCourse);