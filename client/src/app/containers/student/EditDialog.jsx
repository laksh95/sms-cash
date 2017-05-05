import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {openDialog,studentDetails} from '../../actions/studentAction.js'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {isName,isContactNumber,isEmail} from '../../utils/validation'
class EditDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            dob:{},
            fatherName:'',
            motherName:'',
            contactNumber:0,
            alternateNumber:0,
            parentContactNumber:0,
            emailID:'',
            parentEmailID:'',
            currentAddress:'',
            permanentAddress:'',
            errorName:'',
            errorFatherName:'',
            errorMotherName:'',
            errorContactNumber:'',
            errorAlternateNumber:'',
            errorParentContactNumber:'',
            errorEmailID:'',
            errorParentEmailID:'',
            errorPermanentAddress:'',
            errorCurrentAddress:''
        }
    }
    componentWillMount(){
        console.log('---------calling api-------')
        let editStudent = this.props.studentInfo.editStudent.studentId
        this.props.getStudentData({studentId:editStudent})
    }
    componentWillReceiveProps(props){
        this.props=props
    }
    handleClose=()=>{
        this.props.dialogValue(false)
    }
    handleChange = (that,type,event,value)=>{
        console.log('--------inside on change for textfields',type)
        switch(type){
            case 'dateOfBirth':
                break
            case 'name':
                let inputChar = event.target.value
                let specialCharacter = inputChar.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                let number = inputChar.match(/\d+/g)
                if(inputChar.trim() === ''){
                    this.setState({
                        errorName:'Mandatory Field'
                    })
                }
                else if(!(specialCharacter!==null || number !==null)){
                    this.setState({
                        name:inputChar,
                        errorName:''
                    })
                }
                else{
                    this.setState({
                        errorName:'Special Character or Number not allowed'
                    })
                }
                break
            case 'fatherName':
                inputChar = event.target.value
                specialCharacter = inputChar.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                number = inputChar.match(/\d+/g)
                if(inputChar.trim() === ''){
                    this.setState({
                        errorFatherName:'Mandatory Field'
                    })
                }
                else if(!(specialCharacter!==null || number !==null)){
                    this.setState({
                        fatherName:inputChar,
                        errorFatherName:''
                    })
                }
                else{
                    this.setState({
                        errorFatherName:'Special Character or Number not allowed'
                    })
                }
                break
            case 'motherName':
                inputChar = event.target.value
                specialCharacter = inputChar.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
                number = inputChar.match(/\d+/g)
                if(inputChar.trim() === ''){
                    this.setState({
                        errorMotherName:'Mandatory Field'
                    })
                }
                else if(!(specialCharacter!==null || number !==null)){
                    this.setState({
                        motherName:inputChar,
                        errorMotherName:''
                    })
                }
                else{
                    this.setState({
                        errorMotherName:'Special Character or Number not allowed'
                    })
                }
                break
            case 'emailId':
                let email = event.target.value
                if(isEmail(email)){
                    this.setState({
                        errorEmailID:'',
                        emailID:email
                    })
                }
                else{
                    this.setState({errorEmailID:'email of type: email@example.com'})
                }
                break
            case 'parentEmailID':
                email = event.target.value
                if(isEmail(email)){
                    this.setState({
                        errorParentEmailID:'',
                        parentEmailID:email
                    })
                }
                else{
                    this.setState({errorParentEmailID:'email of type: email@example.com'})
                }
                break
            case 'contactNumber':
                let num = event.target.value
                if(number.trim() === ''){
                    this.setState({
                        errorContactNumber:'mandatory Field'
                    })
                }
                else if(number.length >10){
                    this.setState({
                        errorContactNumber:'number can not be greater than 10 digits'
                    })
                }
                else if(isContactNumber(number)){
                    this.setState({
                        contactNumber:number,
                        errorContactNumber:''
                    })
                }
                else{
                    this.setState({
                        errorContactNumber:'Only numbers allowed'
                    })
                }
                break
            case 'parentContactNumber':
                num = event.target.value
                if(number.trim() === ''){
                    this.setState({
                        errorParentNumber:'mandatory Field'
                    })
                }
                else if(number.length >10){
                    this.setState({
                        errorParentNumber:'number can not be greater than 10 digits'
                    })
                }
                else if(isContactNumber(number)){
                    this.setState({
                        parentNumber:number,
                        errorParentNumber:''
                    })
                }
                else{
                    this.setState({
                        errorParentNumber:'Only numbers allowed'
                    })
                }
                break
            case 'alternateContactNumber':
                num = event.target.value
                if(number.trim() === ''){
                    this.setState({
                        errorAlternateNumber:'mandatory Field'
                    })
                }
                else if(number.length >10){
                    this.setState({
                        errorAlternateNumber:'number can not be greater than 10 digits'
                    })
                }
                else if(isContactNumber(number)){
                    this.setState({
                        alternateNumber:number,
                        errorAlternateNumber:''
                    })
                }
                else{
                    this.setState({
                        errorAlternateNumber:'Only numbers allowed'
                    })
                }
                break
            case 'currentAddress':
                break
            case 'permanentAddress':
                break
        }

    }
    /*Disable the future dates to be selected as Date of Birth*/
    disablePreviousDates = (startDate)=>{
        const start=Date.parse(startDate)
        return (date)=>{
            return Date.parse(date) > start
        }
    }
    showEditDetails = ()=>{
        let array = []
        let studentData = this.props.studentInfo.studentData.data
        const startDate=new Date()
        Object.keys(studentData).forEach((key,index)=>{
            if('dateOfBirth' === key){
                let date = new Date(studentData[key])
                array.push(
                    <DatePicker
                        floatingLabelText={key}
                        defaultDate={date}
                        autoOk={true}
                        container="inline"
                        onChange = {this.handleChange.bind(this,key)}
                        shouldDisableDate={this.disablePreviousDates(startDate)}
                    />
                )

            }
            else if('departmentName'==key  || 'curriculumName'==key||'admissionNo'==key || 'gender'==key||'username'==key){
                array.push(
                    <TextField
                        disabled={true}
                        id={key}
                        floatingLabelText={key}
                        defaultValue={studentData[key]}

                    />
                )
            }
            else if(!('studentId'==key || 'sectionId'==key || 'batchId'==key || 'departmentId'==key || 'semesterId'==key||'countryCodeOne' ==key || 'countryCodeTwo' == key || 'curriculumId' == key || 'parentCountryCode' == key || 'departmentAbbreviatedName' == key || 'profilePicUrl' == key || 'semesterType' == key || 'parentId'==key || 'departmentAbbreviatedName'==key)) {
                array.push(
                    <TextField
                        id={key}
                        floatingLabelText={key}
                        defaultValue={studentData[key]}
                        onChange = {this.handleChange.bind(this,key)}
                    />
                )
            }

        })
        return array

    }
    handleSubmit = ()=>{
        let response = {

        }
    }
    render(){
        console.log(this.props.studentInfo.studentData.data)
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleSubmit}
            />,
        ]
        const HANDLE_CODES={

        }
        return(
            <div>
                <Dialog
                    title={'Edit Student Information'}
                    actions={actions}
                    modal={true}
                    open={this.props.studentInfo.dialogOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >{
                    this.props.studentInfo.studentData.data? this.showEditDetails():null
                }
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        studentInfo: state.studentReducer
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        dialogValue: (show)=>{
            dispatch(openDialog(show))
        },
        getStudentData:(data)=>{
            console.log('-----------action called on edit----------')
            dispatch(studentDetails(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditDialog)