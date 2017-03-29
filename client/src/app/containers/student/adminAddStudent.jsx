import React from 'react';
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'
import NumberInput from 'material-ui-number-input';
import RaisedButton from 'material-ui/RaisedButton'
const styles = {
    customWidth: {
        width: 300,
    },
}
class AddStudent extends React.Component {
    constructor(props){
        super(props)
        let dob=new Date();
        this.state={
            dob,
            name:'',
            gender:'Select Gender',
            permanent_address:'',
            current_address:'',
            contact_number:0,
            alternate_number:0,
            emailID:'',
            dept:'Select Department',
            father_name:'',
            mother_name:'',
            father_emailID:'',
            father_contact_number:0,
            department:[],
            errorName:'',
            errorGender:'',
            errorAddress:'',
            errorNumber:'',
            errorAlternateNumber:'',
            errorEmail:'',
            errorDept:'',
            errorFatherName:'',
            errorMotherName:'',
            errorParentNumber:'',
            errorParentEmail:''
        }
    }
    handleDateChange = (event,date)=>{
        this.setState({
            dob:date
        })
    }
    handleChange=(event,index,value)=>{
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
        console.log('------value----',value)

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
    handleNameChange=(event)=>{
        let inputChar=event.target.value
        let specialCharacter = inputChar.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)
        let numCharacter=inputChar.match(/\d+/g)
        if(numCharacter!=null){
            this.setState({
                errorName:'Input cannot contain Numerical Value'
            })
        }
        else if(specialCharacter!=null){
            this.setState({
                errorName:'Input cannot contain special characters'
            })
        }
        else{
            this.setState({
                errorName:''
            })
        }
    }
    render(){
        const startDate=new Date()
        return(
            <div id="AddStudent">
                <div id="StudentHeader">
                    Add Student
                </div>
                <div id="addForm">
                    <div id="fieldNames">
                        <label className="extra_space">Name</label><br/>
                        <label className="extra_space">Gender</label><br/>
                        <label className="extra_space">Date of Birth</label><br/>
                        <label className="extra_space">Permanent Address</label>

                        <br/>
                        <label className="extra_space">Current Address</label><br/>
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
                        <TextField hintText={'Name'}
                                   ref="name"
                                   errorText={this.state.errorName}
                                   onChange={this.handleNameChange}
                        />
                        <DropDownMenu
                            value={this.state.gender}
                            onChange={this.handleChange}
                            autoWidth={false}
                            style={styles.customWidth}
                        >
                            <MenuItem primaryText={'Male'} value={'M'} />
                            <MenuItem primaryText={'Female'} value={'F'} />
                            <MenuItem primaryText={'Other'} value={'Other'} />
                            <br/>
                        </DropDownMenu>
                        <DatePicker
                            hintText="Date of Birth"
                            onChange={this.handleDateChange}
                            container='inline'
                            shouldDisableDate={this.disablePreviousDates(startDate)}
                        />
                        <TextField hintText={'Permanent Address'} ref="permanent_address" />
                        <TextField hintText={'Current Address'} ref="current_address"/>
                        <NumberInput
                            hintText={'Contact Number'}
                            ref="contact_number"
                        />
                        <NumberInput
                            hintText={'Alternate Number'}
                            ref="alternate_number"
                        />
                        <TextField
                            hintText={'email@example.com'}
                            ref="emailID"
                        />
                        <DropDownMenu
                            value={this.state.dept}
                            onChange={this.handleDepartment}
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
                            ref="father_name"
                        />
                        <TextField
                            hintText={'Mother Name'}
                            ref="mother_name"
                        />
                        <TextField
                            hintText={'email@example.com'}
                            ref="parent_emailID"
                        />
                        <NumberInput
                            hintText={'Father Contact Number'}
                            ref="parent_contact_number"
                        />
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
            </div>
        )
    }
}

export default AddStudent