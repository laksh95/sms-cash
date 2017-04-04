import React from 'react';
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
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
            gender: 'Select Gender',
            permanent_address: '',
            disableAddress:false,
            current_address: '',
            contact_number: 0,
            alternate_number: 0,
            emailID: '',
            dept: 'Select Department',
            father_name: '',
            mother_name: '',
            father_emailID: '',
            father_contact_number: 0,
            department: [],
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
            errorParentEmail: ''
        }
    }
  /*  handleDateChange = (event,date)=>{
        this.setState({
            dob:date
        })
    }*/
    /********************************************************
    Prevent user from selecting future dates as  Date of Birth
    *********************************************************/
    disablePreviousDates = (startDate)=>{
        const start=Date.parse(startDate)
        return (date)=>{
            return Date.parse(date) > start
        }
    }

    addStudent=(event)=>{
        event.preventDefault()
        let name=this.refs.name.getValue()
        let permanent_address=this.refs.permanent_address.getValue()
        let current_address=this.refs.current_address.getValue()
        /*let contact_number=this.refs.contact_number.getValue()*/
        /*let alternate_number=this.refs.alternate_number.getValue()*/
        let emailID=this.refs.emailID.getValue()
        let father_name=this.refs.father_name.getValue()
        let mother_name=this.refs.mother_name.getValue()
        let parent_emailID=this.refs.parent_emailID.getValue()
        /*let parent_contact_number=this.refs.parent_contact_number.getValue()*/
    }
    cancel=(event)=>{
        event.preventDefault()
    }
   /* handleGender = (event,index,value)=>{
        if((value!=='M' || value!=='F' || value!=='Others')){
            this.setState({
                gender:value
            },()=>{
                console.log(this.state.gender)
            })
        }
        else{
            this.setState({
                errorGender:'Mandatory Field'
            })
        }
    }*/
    /*************************************************************
     onChange fro all text fields, drop down menus and date picker
     are handled in this single function
    **************************************************************/
    handleChange = (type,event,value)=>{

        switch(type){
            case 'name':
                console.log(type)
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
                        errorName:''
                    })
                }
                break
            case 'gender':
                console.log(value)
                if(value===0){
                    this.setState({
                        gender:'M'
                    },()=>{
                        console.log(this.state.gender)
                    })
                }
                else if(value ===1){
                    this.setState({
                        gender:'F'
                    })
                }
                else if(value ===2){
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
                console.log(value)
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
                        permanent_address:''
                    })
                }
                break
            case 'permanent_address':
                let permanent_address=event.target.value
                if(permanent_address.length!==0){
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
                /*let alternateNumberCharacterMatch = alternateNume.match(/^[0-9]*$/gm)*/
                if(alternateNumberMatch === null){
                    this.setState({
                        errorNumber:'Characters are not allowed.'
                    })
                }
                else if(alternateNumber.length > 10){
                    this.setState({
                        errorAlternateNumber:'Number cannot be greater than 10 digits'
                    })
                }
                else{
                    this.setState({
                        contact_number:number,
                        errorAlternateNumber:''
                    })
                }
                break
            case 'email_id':
                let email=event.target.value
                let content = email.test(/\S+@\S+\.\S+/g)
                console.log(content)
                if(content !== null){
                    this.setState({
                        errorEmail:'Email should be of type: example@example.com'
                    })
                }
                else{
                    this.setState({
                        errorEmail:''
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
            "PARENT_NUMBER":"parent_number",
            "PARENT_EMAIL":"parent_email"

        }
        const startDate=new Date()
        return(
            <div id="AddStudent" >
                <div id="StudentHeader">
                    Add Student
                </div>
                <div id="addForm">
                    <div id="fieldNames">
                        <label className="extra_space">Name</label><br/>
                        <label className="extra_space">Gender</label><br/>
                        <label className="extra_space">Date of Birth</label><br/>
                        <label className="extra_space">Current Address</label>
                        <br/>
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
                            <MenuItem primaryText={'Male'} value={'M'} />
                            <MenuItem primaryText={'Female'} value={'F'} />
                            <MenuItem primaryText={'Other'} value={"Others"} />
                            <br/>
                        </DropDownMenu>
                        <DatePicker
                            hintText="Date of Birth"
                            onChange={this.handleChange.bind(this,HANDLE_CODE.DOB)}
                            container='inline'
                            shouldDisableDate={this.disablePreviousDates(startDate)}
                        />
                        <TextField
                            hintText={'Current Address'}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.CURRENT_ADDRESS)}
                            ref="current_address"
                        />{/*<br/>
                        <Checkbox
                            label="Permanent Address same as Current Address"
                            onCheck={this.handleChange.bind(this,HANDLE_CODE.CHECK)}
                        /><br/>*/}
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
                            value={this.state.dept}
                            onChange={this.handleChange.bind(this,HANDLE_CODE.DEPARTMENT)}
                            autoWidth={false}
                            style={styles.customWidth}
                        >{
                            this.state.department.map((data, index)=>{
                                return(
                                    <MenuItem primaryText={data} value={index} />
                                )
                            })
                        }
                            <br/>
                        </DropDownMenu>
                        <TextField
                            hintText={'Father Name'}
                            errorText={this.state.errorFatherName}
                            onChange={this.handleChange.bind(this)}
                            ref="father_name"
                        />
                        <TextField
                            hintText={'Mother Name'}
                            errorText={this.state.errorMotherName}
                            ref="mother_name"
                        />
                        <TextField
                            hintText={'email@example.com'}
                            errorText={this.state.errorParentEmail}
                            ref="parent_emailID"
                        />
                        <TextField
                            hintText={'Father Contact Number'}
                            errorText={this.state.errorParentNumber}
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
            </div>
        )
    }
}

export default AddStudent