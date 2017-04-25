import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import Snackbar from 'material-ui/Snackbar';
require('rc-pagination/assets/index.css');
import {setCourse,setPagedCourse,setPagination,setSnackbarOpen,setSnackbarMessage,setValue,editCourse,addCourse , deleteCourse,getCourses,generateOTP} from '../../actions/courseActions.js'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from './../../store'
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
            validateCourseDuration : true,
            open:false,
            verificationDialog:false,
            errorTextOTP:"",
            otp:0

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
                case 'none':
                    errorText='';
                    break
            }
            this.setState({ errorText: errorText });
        };
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    pageChange = (currentPage , size) =>{
        console.log("page change",currentPage)
        let course = this.props.courseReducer.course
        let start = (currentPage-1)*10
        let end = start + 10
        let pagedCourses = []
        for(let index in course){
            if(index>=start && index<end){
                pagedCourses.push(course[index])
            }
        }
        let  data = {
            currentPage,
            pagedCourses
        }
        this.props.setPagination(data)
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
        console.log("inside set duration")
        let duration = event.target.value
        let course = this.state.curCourse
        if(duration.trim() === ''){
            this.setState({
                validateCourseDuration:false
            })
        }
        else if(this.state.errorText === undefined || this.state.errorText === ""){
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
        console.log("Inside Handle",data)
        /*this.props.deleteCourse(data)*/
        this.setState({deleteDialog: false, verificationDialog:true});
        this.props.generateOTP()
    };
    handleClose = (key) => {
        this.setState({open: false});

    };
    handleCloseWithEdit = (key) => {
        this.setState({open: false});
        let data = this.state.curCourse
        console.log("~~~~~~~~~~~~~~~~~",data)
        this.props.editCourse(data)
    }
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
    /*************************************************************************
    Handle text value change for OTP text field in the verification dialog box
    **************************************************************************/
    handleOTP = (event)=>{
        let otp=event.target.value
        this.setState({
            otp
        })
    }
    setCourseName(event){
        let course = this.state.curCourse
        let name = event.target.value
        if(name.trim()=='') {
            this.setState({
                errorText1:"course Name required"
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
        this.props.getCourses()
    }
    handleVerificationClose = ()=>{
        this.setState({
            verificationDialog:false
        })
    }
    handleVerificationSubmit = ()=>{
        let data= this.state.curCourse
        if(this.state.otpValue === 0){
            this.setState({
                errorTextOTP:'Cannot be left blank'
            })
        }
        else{
            console.log('------',this.state.curCourse.id,'-----------')
            let response = {
                otp:this.state.otp,
                data:this.state.curCourse.id
            }
            this.setState({
                verificationDialog:false
            })
            this.props.deleteCourse(response)

        }
    }
    render(){
        if(this.state.errorText === 'none' || this.state.errorText.trim() === '')
            this.state.validateCourseDuration=true
        const verificationActions=[
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleVerificationClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleVerificationSubmit}
            />
        ]
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
                        onError={onError}
                        onChange={this.setCourseDuration}
                        onRequestValue={onRequestValue} />
                    <br />
                </Dialog>
                <div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow >
                                <TableHeaderColumn>Course_Name</TableHeaderColumn>
                                <TableHeaderColumn>Course_Duration(Years)</TableHeaderColumn>
                                <TableHeaderColumn>No of Department</TableHeaderColumn>
                                <TableHeaderColumn/>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {
                                this.props.courseReducer.pagedCourses.map((data,index)=>{
                                    return (
                                        <TableRow key={index}>
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
                <Pagination className="ant-pagination" defaultCurrent={1} total={this.props.courseReducer.totalPages} current={this.props.courseReducer.currentPage} defaultPageSize={10} onChange={this.pageChange}/>
                {/*Confirm delete option*/}
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.deleteDialog}
                    onRequestClose={this.handleDeleteClose}
                >
                    Are you sure you want to delete ?
                </Dialog>
                <Dialog
                    actions={verificationActions}
                    modal={false}
                    open={this.state.verificationDialog}
                    onRequestClose={this.handleVerificationClose}
                >
                    On Deleting this course all departments and student data will also be lost.
                    <br/>One Time Password has been sent to your email ID, enter below.
                    <br/>
                    <TextField
                        hintText='Enter OTP'
                        onChange={this.handleOTP}
                        errorText={this.state.errorTextOTP}
                    />
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
        courseReducer: state.courseReducer,
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
        },
        setPagination:(data)=>{
            dispatch(setPagination(data))
        },
        generateOTP:()=>{
            dispatch(generateOTP())
        }
    };
};
export  default connect(mapStateToProps,mapDispatchToProps)(ViewCourse);