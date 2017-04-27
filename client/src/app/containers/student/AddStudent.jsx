import React from 'react';
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import {connect} from 'react-redux'
import {addStudent,getInitialData} from '../../actions/studentAction.js'
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import Snackbar from 'material-ui/Snackbar'
const styles = {
    customWidth: {
        width: 300
    },
}
class AddStudent extends React.Component {
    constructor(props) {
        super(props)
        let dob = new Date();
        this.state = {
            dob,
            name: '',
            gender: 'S',
            permanent_address: '',
            disableAddress:false,
            current_address: '',
            contact_number: 0,
            alternate_number: 0,
            emailID: '',
            dept: 0,
            father_name: '',
            mother_name: '',
            parent_emailID: '',
            parent_number: 0,
            department:0,
            errorName: '',
            errorGender: '',
            errorAddress: '',
            errorNumber: '',
            errorAlternateNumber: '',
            errorEmail: '',
            errorDept: '',
            errorFatherName: '',
            errorMotherName: '',
            errorParentNumber: '',
            errorParentEmail: '',
            open:false,
            message:''
        }
    }
    componentWillMount(){
        this.props.getDepartment({
            courseId:1
        })

    }
    /********************************************************
    Prevent user from selecting future dates as  Date of Birth
    *********************************************************/
    disablePreviousDates = (startDate)=>{
        const start=Date.parse(startDate)
        return (date)=>{
            return Date.parse(date) > start
        }
    }
    /***********************************************************
    This function is called first time the component is mounted,
    it is called to populate the department drop down list.
    **********************************************************/
    /*componentWillMount(){
        this.props.getDepartment({
            courseId:1
        })
    }*/
    componentWillReceiveProps(nextProps){
        this.props=nextProps
    }
    /*******************************************************************************************************
    Check whether no field is empty and then make a call to action and display the snack bar msg accordingly
    ********************************************************************************************************/
    addStudent=(event)=>{
        event.preventDefault()
        let studentInfo={
            name:this.state.name,
            gender:this.state.gender,
            dob:this.state.dob,
            current_address:this.state.current_address,
            permanent_address:this.state.permanent_address,
            department:this.state.department,
            contact_number:this.state.contact_number,
            alternate_number:this.state.alternate_number,
            emailID:this.state.emailID,
            father_name:this.state.father_name,
            mother_name:this.state.mother_name,
            parent_emailID:this.state.parent_emailID,
            parent_contact_number:this.state.parent_number
        }
        let flag = 1
        Object.keys(studentInfo).forEach((key)=>{
            console.log('---->',key, studentInfo[key])
            if(studentInfo[key] === '' || studentInfo[key] === undefined || studentInfo[key] === [] || studentInfo[key] === 0){
                flag = 0
            }
        })
        if(1 === flag){
            this.props.addStudent(studentInfo)
            this.setState({
                message:'Student Added Successfully'
            })
        }
        else{
            this.setState({
                message:'All fields are mandatory'
            })
        }
        this.handleTouchTap()
    }
    cancel=(event)=>{
        event.preventDefault()
    }
    /*****************************************
    Handles snack bar open and close animation
    ******************************************/
    handleTouchTap = ()=>{
        this.setState({
            open:true
        })
    }
    handleRequestClose = ()=>{
        this.setState({
            open:false
        })
    }
    /*************************************************************
     onChange for all text fields, drop down menus and date picker
     are handled in this single function
    **************************************************************/
    handleChange = (type,event,value)=>{

        switch(type){
            case 'name':
                let inputChar=event.target.value
                let specialCharacter = inputChar.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                let numCharacter=inputChar.match(/\d+/g)
                if(specialCharacter !== null){
                    this.setState({
                        errorName:'Input cannot contain Special Character'
                    })
                }
                else if(numCharacter !== null){
                    this.setState({
                        errorName:'Input cannot contain Numerical Value'
                    })
                }
                else{
                    this.setState({
                        errorName:'',
                        name:inputChar
                    })
                }
                break
            case 'gender':
                if(value === 1){
                    this.setState({
                        gender:'M'
                    },()=>{
                        console.log(this.state.gender)
                    })
                }
                else if(value === 2){
                    this.setState({
                        gender:'F'
                    })
                }
                else if(value === 3){
                    this.setState({
                        gender:'Others'
                    })
                }
                else{
                    this.setState({
                        errorGender:'Mandatory Field'
                    })
                }
                break
            case 'dob':
                this.setState({
                    dob:value
                })
                break
            case 'current_address':
                let address=event.target.value
                if(address.length !== 0){
                    this.setState({
                        current_address:address
                    })
                }
                else{
                    this.setState({
                        current_address:''
                    })
                }
                break
            case 'is_checked':
                if(value){
                    let current_address=this.state.current_address
                    this.setState({
                        permanent_address:current_address,
                        disableAddress:true
                    })
                }
                else{
                    this.setState({
                        permanent_address:'',
                        disableAddress:false
                    })
                }
                break
            case 'permanent_address':
                let permanent_address=event.target.value
                if(permanent_address.length !== 0){
                    this.setState({
                        permanent_address:permanent_address
                    })
                }
                else{
                    this.setState({
                        permanent_address:''
                    })
                }
                break
            case 'contact_number':
                let number=event.target.value
                let numberMatch=number.match(/\d+/g)
                if(numberMatch === null){
                    this.setState({
                        errorNumber:'Characters are not allowed.'
                    })
                }
                else if(number.length > 10){
                    this.setState({
                        errorNumber:'Number cannot be greater than 10 digits'
                    })
                }
                else{
                    this.setState({
                        contact_number:number,
                        errorNumber:''
                    })
                }
                break
            case 'alternate_number':
                let alternateNumber=event.target.value
                let alternateNumberMatch=alternateNumber.match(/^[0-9]*$/gm)
                /*let alternateNumberCharacterMatch = alternateNumber.match(/^[0-9]*$/gm)*/
                if(alternateNumberMatch === null){
                    this.setState({
                        errorAlternateNumber:'Characters are not allowed.'
                    })
                }
                else if(alternateNumber.length > 10){
                    this.setState({
                        errorAlternateNumber:'Number cannot be greater than 10 digits'
                    })
                }
                else{
                    this.setState({
                        alternate_number:alternateNumber,
                        errorAlternateNumber:''
                    })
                }
                break
            case 'email_id':
                let email=event.target.value
                let content = email.match(/\S+@\S+\.\S+/g)
                if(email.trim() === ''){
                    this.setState({errorEmail:'Mandatory Field'})
                }
                else if(content === null){
                    this.setState({
                        errorEmail:'Email should be of type: example@example.com'
                    })
                }
                else{
                    this.setState({
                        errorEmail:'',
                        emailID:email
                    })
                }
                break
            case 'department':
                if(value !== 0){
                    this.setState({
                        department:value
                    })
                }
                break
            case 'father_name':
                let father_name=event.target.value
                if(father_name.trim() === ''){
                    this.setState({
                        errorFatherName:'Mandatory Field'
                    })
                }
                else {
                    let specialCharacter = father_name.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                    let numCharacter=father_name.match(/\d+/g)
                    if(specialCharacter !== null && numCharacter !== null){
                        this.setState({
                            errorFatherName:'Field cannot contain Number and(or) Special character'
                        })
                    }
                    else{
                        this.setState({
                            errorFatherName:'',
                            father_name:father_name
                        })
                    }
                }
                break
            case 'mother_name':
                let mother_name=event.target.value
                if(mother_name.trim() === ''){
                    this.setState({
                        errorMotherName:'Mandatory Field'
                    })
                }
                else {
                    specialCharacter = mother_name.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                    numCharacter=mother_name.match(/\d+/g)
                    if(specialCharacter !== null && numCharacter !== null){
                        this.setState({
                            errorMotherName:'Field cannot contain Number and(or) Special character'
                        })
                    }
                    else{
                        this.setState({
                            errorMotherName:'',
                            mother_name:mother_name
                        })
                    }
                }
                break
            case 'parent_email':
                let parentEmail=event.target.value
                content = parentEmail.match(/\S+@\S+\.\S+/g)
                console.log(content)
                if(parentEmail.trim() === ''){
                    this.setState({errorParentEmail:'Mandatory Field'})
                }
                else if(content === null){
                    this.setState({
                        errorParentEmail:'Email should be of type: example@example.com'
                    })
                }
                else{
                    this.setState({
                        errorParentEmail:'',
                        parent_emailID:parentEmail
                    })
                }
                break
            case 'parent_number':
                number=event.target.value
                numberMatch=number.match(/\d+/g)
                if(numberMatch === null){
                    this.setState({
                        errorParentNumber:'Characters are not allowed.'
                    })
                }
                else if(number.length > 10){
                    this.setState({
                        errorParentNumber:'Number cannot be greater than 10 digits'
                    })
                }
                else{
                    this.setState({
                        parent_number:number,
                        errorNumber:''
                    })
                }
                break
        }
    }

    /******************************************
     render all the elements for this component
    *******************************************/

    render(){
        const HANDLE_CODE={
            "NAME":"name",
            "DOB":"dob",
            "GENDER":"gender",
            "PERMANENT_ADDRESS":"permanent_address",
            "CHECK":"is_checked",
            "DEPARTMENT":"department",
            "CURRENT_ADDRESS":"current_address",
            "CONTACT_NUMBER":"contact_number",
            "ALTERNATE_NUMBER":"alternate_number",
            "EMAIL":"email_id",
            "FATHER_NAME":"father_name",
            "MOTHER_NAME":"mother_name",
            "PARENT_EMAIL":"parent_email",
            "PARENT_NUMBER":"parent_number"
        }
        const startDate=new Date()
        return(
            <div id="AddStudent" >
                <div id="StudentHeader">
                   <div id="logo">
                       <ContentAddCircleOutline style={{color:'white'}} />
                   </div>
                    <div id="formName">
                      Add Student
                    </div>
                </div>
                <div id="addForm">
                    <div id="fieldNames">
                        <label className="extra_space">Name</label><br/>
                        <label className="extra_space">Gender</label><br/>
                        <label className="extra_space">Date of Birth</label><br/>
                        <label className="extra_space">Current Address</label>
                        <br/>
                        <br/><br/><br/>
                        <label className="extra_space">Permanent Address</label><br/>
                        <label className="extra_space">Contact Number</label><br/>
                        <label className="extra_space">Alternate Number</label><br/>
                        <label className="extra_space">Email ID</label><br/>
                        <label className="extra_space">Department</label><br/>
                        <label className="extra_space">Father's Name</label><br/>
                        <label className="extra_space">Mother's Name</label><br />
                        <label className="extra_space">Father's Email ID</label><br/>
                        <label className="extra_space">Father's Contact Number</label><br/>
                    </div>
                    <div id="fieldValues">
                        <TextField
                            hintText={'Name'}
                            ref="name"
                            errorText={this.state.errorName}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.NAME)}
                        />
                        <DropDownMenu
                            value={this.state.gender}
                             onChange={this.handleChange.bind(this,HANDLE_CODE.GENDER)}
                            autoWidth={false}
                            style={styles.customWidth}
                        >
                            <MenuItem primaryText={'Select Gender'} value={'S'} />
                            <MenuItem primaryText={'Male'} value={'M'} />
                            <MenuItem primaryText={'Female'} value={'F'} />
                            <MenuItem primaryText={'Other'} value={"Others"} />
                            <br/>
                        </DropDownMenu>
                        <DatePicker
                            hintText="Date of Birth"
                            onChange={this.handleChange.bind(this,HANDLE_CODE.DOB)}
                            container='inline'
                            autoOk={true}
                            shouldDisableDate={this.disablePreviousDates(startDate)}
                        />
                        <TextField
                            hintText={'Current Address'}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.CURRENT_ADDRESS)}
                            ref="current_address"
                        />
                        <Checkbox
                            label="Permanent Address same as Current Address"
                            onCheck={this.handleChange.bind(this,HANDLE_CODE.CHECK)}
                        />
                        <TextField
                            hintText={'Permanent Address'}
                            disabled={this.state.disableAddress}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.PERMANENT_ADDRESS)}
                            ref="permanent_address"
                        />
                        <TextField
                            hintText={'Contact Number'}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.CONTACT_NUMBER)}
                            errorText={this.state.errorNumber}
                            ref="contact_number"
                        />
                        <TextField
                            hintText={'Alternate Number'}
                            errorText={this.state.errorAlternateNumber}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.ALTERNATE_NUMBER)}
                            ref="alternate_number"
                        />
                        <TextField
                            hintText={'email@example.com'}
                            errorText={this.state.errorEmail}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.EMAIL)}
                            ref="emailID"
                        />
                        <DropDownMenu
                            value={this.state.department}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.DEPARTMENT)}
                            autoWidth={false}
                            style={styles.customWidth}
                        >
                            <MenuItem
                                primaryText="Select Department"
                                value={0}
                            />
                            {
                                this.props.departmentList.data?
                                    (this.props.departmentList.data.departments.map((data,index)=>{
                                        return(
                                            <MenuItem
                                                id={index}
                                                primaryText={data.abbreviatedName}
                                                value={data.id}
                                            />
                                        )
                                    })):null
                            }
                            <br/>
                        </DropDownMenu>
                        <TextField
                            hintText={'Father Name'}
                            errorText={this.state.errorFatherName}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.FATHER_NAME)}
                            ref="father_name"
                        />
                        <TextField
                            hintText={'Mother Name'}
                            errorText={this.state.errorMotherName}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.MOTHER_NAME)}
                            ref="mother_name"
                        />
                        <TextField
                            hintText={'email@example.com'}
                            errorText={this.state.errorParentEmail}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.PARENT_EMAIL)}
                            ref="parent_emailID"
                        />
                        <TextField
                            hintText={'Father Contact Number'}
                            errorText={this.state.errorParentNumber}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.PARENT_NUMBER)}
                            ref="parent_contact_number"
                        />
                    </div>
                </div>
                <div id="buttons">
                    <RaisedButton label="Add Student" primary={true}
                                  onClick={this.addStudent}
                    />
                    <RaisedButton label="Cancel" secondary={true}
                                  onClick={this.cancel}
                    />
                 </div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        studentInfo:state.studentReducer,
        departmentList: state.studentReducer.initialData
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        addStudent: (studentInfo)=>{
            dispatch(addStudent(studentInfo))
        },
        getDepartment: (courseId)=>{
            dispatch(getInitialData(courseId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddStudent)