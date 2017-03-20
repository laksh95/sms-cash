import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import cookie from 'react-cookie'
import {Link} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};
const style = {
    margin: 12,
};
class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
            validateCourseName :true,
            validateCourseDuration : true ,
            validateNewCourseName : false,
            validateNewCourseDuration:false,
        };
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
        this.setCourseName = this.setCourseName.bind(this)
        this.addCourseName = this.addCourseName.bind(this)
        this.setCourseDuration = this.setCourseDuration.bind(this)
        this.addCourseDuration = this.addCourseDuration.bind(this)
        this.addCourse = this.addCourse.bind(this)
    }
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
        axios.delete('/deleteCourse',data)
        this.setState({deleteDialog: false});
    };
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    handleOpen = (key,data) => {
        console.log(key)
        console.log(data)
        this.setState({open: true});
        this.setState({
            curCourse : data
        })
    };
    handleClose = (key) => {
        console.log(key)
        this.setState({open: false});

    };
    handleCloseWithEdit = (key) => {
        console.log(key)
        this.setState({open: false});
        let data = this.state.curCourse
        axios.put('/editCourse',data).then((response)=>{
            console.log(response)
        })
            .catch((response)=>{
                console.log(response)
            })
    };

    setCourseName(event){
        let course = this.state.curCourse
        console.log("inside set course",event.target.value)
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
                name : event.target.value ,
                duration :course.duration,
                noOfDept : course.noOfDept
            }
        })
    }
    setCourseDuration(event){
        let course = this.state.curCourse
        let duration = event.target.value
        console.log("Inside set course",duration)
        console.log("Duration",duration)
        if(this.state.errorText==undefined || this.state.errorText==""){
            this.setState({
                validateCourseDuration:true
            })
        }
        else
            this.setState({
                validateCourseDuration:false
            })
        console.log("Error Text",this.state.errorText)
        this.setState({
            curCourse:{
                name : course.name ,
                duration :event.target.value,
                noOfDept : course.noOfDept
            }
        })
    }
    addCourseName(event){
        console.log("inside add course name")
        console.log(event.target.value)
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
        console.log("inside add course duration")
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
        axios.post('/addCourse',{
            courseName : newCourse,
            duration : newDuration
        })
    }

    componentWillReceiveProps(props){
        this.props = props
    }
    componentWillMount(){
        axios.get('/getCourses').then((response)=>{
            console.log(response)
            this.setState({
                course:response
            })
        })
        .catch((response)=>{
            console.log(response)
        })
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
        const {state, onChange, onError,onError1, onKeyDown, onValid, onRequestValue} = this;
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

        let contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
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
                    value={this.state.curCourse.duration}
                    required
                    strategy="warn"
                    errorText={this.state.errorText}
                    onValid={onValid}
                    onChange={this.setCourseDuration}
                    onError={onError}
                    onRequestValue={onRequestValue} />
                <br />
                </Dialog>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="View" value="a">
                        <div>
                            <h2 style={styles.headline}>Controllable Tab A</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow >
                                        <TableHeaderColumn>Course_Name</TableHeaderColumn>
                                        <TableHeaderColumn>Course_Duration</TableHeaderColumn>
                                        <TableHeaderColumn>No of Department</TableHeaderColumn>
                                        <TableHeaderColumn></TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox="false">
                                    {
                                        this.state.course.map((data,index)=>{
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
                    </Tab>
                    <Tab label="Add" value="b">
                        <div>
                            <h2 style={styles.headline}>Add a course</h2>
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
                                          style={style}
                                          disabled = {!(this.state.validateNewCourseName && this.state.validateNewCourseDuration)}
                            />

                        </div>
                    </Tab>
                </Tabs>
                <Dialog
                    actions={dialogActions}
                    modal={false}
                    open={this.state.deleteDialog}
                    onRequestClose={this.handleDeleteClose}
                >
                    Are you sure you want to delete ?
                </Dialog>
            </div>
        )
    }
}
export default Course