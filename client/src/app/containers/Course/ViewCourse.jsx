import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
require('rc-pagination/assets/index.css');
import {setCourse,setPagedCourse,setSnackbarOpen,setSnackbarMessage,setValue} from './../../actions/courseAction.jsx'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from './../../store.jsx'
import {connect} from 'react-redux'

const Pagination = require('rc-pagination');
class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle =  this.handleToggle.bind(this);
        this.state = {
            currentPage : 1 ,
            totalPages : 1,
            deleteDialog : false,
            curCourse:{},
            errorText1 :"",
            errorText :"",
            validateCourseName :true,
            validateCourseDuration : true
        };
        this.setCourseName = this.setCourseName.bind(this)
        this.setCourseDuration = this.setCourseDuration.bind(this)
        this.onError = (error) => {
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
            this.setState({ errorText: errorText });
        };
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    pageChange = (currentPage , size) =>{
        this.setState({
            currentPage : currentPage
        })
        let course = this.props.courseReducer.course
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
    handleDeleteOpen = (index,data) => {
        this.setState({
            curCourse : data
        })
        this.setState({deleteDialog: true});
    };
    snackbarHandleRequestClose = () => {

        this.props.setSnackbarOpen(false)
    };
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
                duration :duration,
                noOfDept : course.noOfDept
            }
        })
    }

    handleDeleteClose = () => {
        this.setState({deleteDialog: false});
    };
    handleDeleteCloseWithUpdate = () => {
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/deleteCourse',data).then((response)=>{
            let course = this.props.courseReducer.course
            for(let index in course){
                if(course[index].id==data.id){
                    course.splice(index,1)
                }
            }
            this.props.setCourse(course)
            let size= this.props.courseReducer.course.length
            this.setState({
                totalPages:size
            })
            course = this.props.courseReducer.course
            this.setState({
                currentPage : 1
            })

            this.props.setSnackbarOpen(true)
            this.props.setSnackbarMessage("Course Deleted")
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            this.props.setPagedCourse(pagedCourses)
        })
            .catch((response)=>{
                console.log(response)
            })
        this.setState({deleteDialog: false});
    };
    handleClose = (key) => {
        this.setState({open: false});

    };
    handleCloseWithEdit = (key) => {
        this.setState({open: false});
        let data = this.state.curCourse
        axios.put('http://localhost:3166/api/course/editCourse',data).then((response)=>{
            console.log("response",response.data[0])
            if(response.data[0]==1){
                let course = this.props.courseReducer.course.data
                console.log("course-----------",course)
                for(let index in course){
                    if(course[index].id===data.id){
                        course[index] = data
                    }
                }
                this.props.setCourse(course)
                let size = course.length
                // let totalPages = Math.floor(size/10)+1
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
                console.log("-----------",pagedCourses)
                this.props.setPagedCourse(pagedCourses)
                this.props.setSnackbarMessage("Field Edited Successfully")
                this.props.setSnackbarOpen(true)
            }
            else {
                this.props.setSnackbarMessage("Internal Server Error")
                this.props.setSnackbarOpen(true)
            }
        })
        .catch((response)=>{
            console.log(response)
        })
    };
    handleOpen = (key,data) => {
        console.log("******************",data)
        this.setState({open: true});
        this.setState({
            curCourse : data
        })
    };
    handleToggle(){
        this.setState({open: !this.state.open});
    }
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
    componentWillMount(){
        axios.get('http://localhost:3166/api/course/getCourses').then((response)=>{
            this.props.setCourse(response)
            // this.setState({
            //     course:response.data
            // })
            let course = response.data
            let size = course.length
            // let totalPages = Math.floor(size /10 )+1
            this.setState({
                totalPages : size
            })
            let pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            // this.setState({
            //     pagedCourses:pagedCourses
            // })
            this.props.setPagedCourse(pagedCourses)
        })
        .catch((response)=>{
            console.log(response)
        })
    }
    render(){
        console.log('viewCourse.jsx',this.props.courseReducer)
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={!(this.state.validateCourseDuration && this.state.validateCourseName)}
                onTouchTap={this.handleCloseWithEdit}
            />
        ];
        const {state, onChange, onError,onError1, onKeyDown, onValid, onRequestValue} = this;
        const contentStyle = {
            marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
        };
        if (this.state.open) {
            contentStyle.marginLeft = 230;
        }
        console.log("++++++++++++++++++++",this.state.curCourse.duration)
        return (

            <div>
                <Dialog
                    title="Edit Course"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField
                        hintText="Course Name"
                        value = {this.state.curCourse.name}
                        onChange={this.setCourseName}
                        errorText={this.state.errorText1}
                    /><br />
                    <NumberInput
                        id="num"
                        hintText="Duration"
                        defaultValue={this.state.curCourse.duration}
                        required
                        strategy="warn"
                        errorText={this.state.errorText}
                        onValid={onValid}
                        onChange={this.setCourseDuration}
                        onError={onError}
                        onRequestValue={onRequestValue} />
                    <br />
                </Dialog>
                <div>
                    <h2 className="headline">Courses</h2>
                    <Table>
                        <TableHeader adjustForCheckbox={false}>
                            <TableRow >
                                <TableHeaderColumn>Course_Name</TableHeaderColumn>
                                <TableHeaderColumn>Course_Duration</TableHeaderColumn>
                                <TableHeaderColumn>No of Department</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.props.courseReducer.pagedCourses.map((data,index)=>{
                                    return (
                                        <TableRow>
                                            <TableRowColumn><FlatButton label={data.name}/></TableRowColumn>
                                            <TableRowColumn>{data.duration}</TableRowColumn>
                                            <TableRowColumn>{data.noOfDept}</TableRowColumn>
                                            <TableRowColumn><FlatButton primary={true}  onTouchTap={(key)=>this.handleOpen(index,data)} label="Edit"/></TableRowColumn>
                                            <TableRowColumn><FlatButton secondary={true}  onTouchTap={(key)=>this.handleDeleteOpen(index,data)} label="Delete"/></TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="ant-pagination" defaultCurrent={1} total={this.state.totalPages} current={this.state.currentPage} defaultPageSize={10} onChange={this.pageChange}/>
                {/*Confirm delete option*/}
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.deleteDialog}
                    onRequestClose={this.handleDeleteClose}
                >
                    Are you sure you want to delete ?
                </Dialog>
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
export  default connect(mapStateToProps,mapDispatchToProps)(ViewCourse);









