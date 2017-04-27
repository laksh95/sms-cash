import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import { addUser } from '../../actions/teacherActions'
import { connect } from 'react-redux'
import { validateEmail,isAllAlphabets } from '../../utils/validation.js'
import {setErrorMessage} from './../../actions/errorActions'
import { resetToNoErrorTeacher } from '../../actions/teacherActions.js'
import { resetToNoErrorSubject } from '../../actions/subjectActions.js'
import { browserHistory } from 'react-router'
import Snackbar from 'material-ui/Snackbar'

class AddTeacher extends React.Component{
    constructor(props) {
    	super(props);
      this.state = {
          departmentSelected: null,
          teacherName: null,
          joinDate: "",
          designation: null,
          email: null,
          emailInvalid: true,
          nameInvalid: true,
          designationInvalid: true,
          dateInvalid: true,
          genderInvalid: true,
          departmentInvalid: true,
          birthDateInvalid: true,
          departmentId: null,
          disableAddButton: true,
          birthDate: null,
          gender: null,
          validationInForm: false,
          nameErrorText: "",
          emailErrorText: "",
          designationErrorText: "",
          allGender: [
            {
              name: "MALE"
            },
            {
              name: "FEMALE"
            },
            {
              name: "OTHERS"
            }
          ]
      }
    }
    checkAllValidations = () => {
      if(this.state.emailInvalid == false && this.state.nameInvalid == false && this.state.designationInvalid == false
        && this.state.dateInvalid == false && this.state.departmentInvalid == false && this.state.birthDateInvalid == false
        && this.state.genderInvalid == false){
        this.setState({
          disableAddButton: false
        })
      }
      else{
        this.setState({
          disableAddButton: true
        })
      }
    }
    handleChange = (type, event) => {
      switch (type) {
        case "addUser":
          for(let index = 0; index<this.props.teacherReducer.allTeacher.length; index++){
            if(this.state.email == this.props.teacherReducer.allTeacher[index].teacher_email){
              this.setState({
                emailInvalid: true,
                validationInForm: true
              })
              return
            }
          }

          this.setState({
            validationInForm: false
          })

          let details = {
            name: this.state.teacherName,
            department: this.state.departmentSelected,
            emailId: this.state.email,
            joinDate: this.state.joinDate,
            designation: this.state.designation,
            deptId: this.state.departmentId,
            dateOfBirth: this.state.birthDate,
            gender: this.state.gender
          }
          this.props.addUser(details)
          break
        case "getName":
          this.setState({
            teacherName: event.target.value,
            nameErrorText: ""
          })
          if(event.target.value == ""){
            this.setState({
              nameInvalid: true,
              nameErrorText: "Must not be empty"
            }, ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if ( isAllAlphabets(event.target.value)) {
              this.setState({
                nameInvalid: true,
                nameErrorText: "Only characters please"
              },  ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                nameInvalid: false,
                nameErrorText: ""
              },  () => {
                this.checkAllValidations()
              })
            }
          }
          break
        case "getDesignation":
          this.setState({
            designation: event.target.value,
            designationErrorText: ""
          })
          if(event.target.value == ""){
            this.setState({
              designationInvalid: true,
              designationErrorText: "Must not be empty"
            },  ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if ( isAllAlphabets(event.target.value)) {
              this.setState({
                designationInvalid: true,
                designationErrorText: "Only characters please"
              }, ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                designationInvalid: false,
                designationErrorText: ""
              },  ()=> {
                this.checkAllValidations()
              })
            }
          }
          break
        case "getEmail":
          this.props.resetToNoErrorTeacher
          this.setState({
            email: event.target.value,
            validationInForm: false,
            emailErrorText: ""
          })
          if(event.target.value == ""){
            this.setState({
              emailInvalid: true,
              emailErrorText:"Must not be empty"
            },  ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if( validateEmail(event.target.value)){
              this.setState({
                emailInvalid: false,
                emailErrorText: ""
              },  ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                emailInvalid: true,
                emailErrorText:"Give email in correct format"
              },  ()=> {
                this.checkAllValidations()
              })
            }
          }
          break
        default:
          break
      }
    }
    getDate = (event, date) => {
      this.setState({
        joinDate: date,
        dateInvalid: false
      }, ()=> {
        this.checkAllValidations()
      })
    }
    getBirthDate = (event, date) => {
      this.setState({
        birthDate: date,
        birthDateInvalid: false
      }, ()=> {
        this.checkAllValidations()
      })
    }
    hadleChangeDepartment = (event, index, value) => {
      let departmentId = null
      let departmentExisting = this.props.subjectReducer.department
      for(let index = 0; index<departmentExisting.length; index++){
        if(departmentExisting[index].name==value){
          departmentId = departmentExisting[index].id
          break
        }
      }
      this.setState({
        departmentSelected: value,
        departmentId: departmentId,
        departmentInvalid: false
      }, ()=> {
        this.checkAllValidations()
      })
    }
    hadleChangeGender = (event, index, value) => {
      this.setState({
        gender: value,
        genderInvalid: false
      }, ()=> {
        this.checkAllValidations()
      })
    }
    errorSnackBar = (errorMessage) => {
      if(this.props.teacherReducer.error == false){
        if(this.props.teacherReducer.successSnackBar == true)
        return (
          <Snackbar
          open={true}
          message={"Added a teacher"}
          autoHideDuration={4000}
          />
        )
      }
      if(this.state.validationInForm == true){
        return (
          <Snackbar
          open={true}
          message={"A teacher with the same Email ID exists"}
          autoHideDuration={4000}
          />
        )
      }
      else{
        return (
          <Snackbar
          open={true}
          message={errorMessage}
          autoHideDuration={4000}
          />
        )
      }
    }
    componentWillUnmount() {
      this.props.resetToNoErrorTeacher()
      this.props.resetToNoErrorSubject()
    }

    componentWillReceiveProps(nextProps){
      this.props = nextProps
      if(this.props.teacherReducer.showErrorPage){
          this.props.setErrorMessage(this.props.teacherReducer.errorMessage);
          browserHistory.push('/error');
      }
      if(this.props.subjectReducer.showErrorPage){
          this.props.setErrorMessage(this.props.subjectReducer.errorMessage);
          browserHistory.push('/error');
      }
    }

    render(){
      const style = {
        margin: 12
      }
      const formStyle = {
        marginLeft: "40%"
      }
      const divStyle = {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#DCDCDC"
      }
    	return(
        <div style={divStyle}>
    		<div style={formStyle}>
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.hadleChangeDepartment }
          >
          {
            this.props.subjectReducer.errorDepartment===false?
            (this.props.subjectReducer.department.map((data, index)=>{
              return(
                <MenuItem key={data.id} value={data.name} primaryText={data.name} />
              )
           })) : (
               <MenuItem key={1} disabled={true} value='No data' primaryText='No data' />
             )
          }
          </SelectField>
          <br />
          <SelectField
          floatingLabelText="Gender"
          value={this.state.gender}
          onChange={this.hadleChangeGender }
          >
          {
            (this.state.allGender.map((data, index)=>{
              return(
                <MenuItem key={index} value={data.name} primaryText={data.name} />
              )
            }))
          }
          </SelectField>
          <br />
          <form>
              <TextField
              floatingLabelText="Teacher name"
              onChange={ this.handleChange.bind(this, "getName") }
              errorText={this.state.nameErrorText}
              />
              <br />
              <TextField
              floatingLabelText="Teacher designation"
              onChange={this.handleChange.bind(this, "getDesignation")}
              errorText={this.state.designationErrorText}
              />
              <br />
              <TextField
              floatingLabelText="Teacher Email ID"
              onChange={this.handleChange.bind(this, "getEmail")}
              errorText={this.state.emailErrorText}
              />
              <br /><br />
              <DatePicker hintText="Join Date" mode="landscape" onChange={ this.getDate }/>
              <br /><br />
              <DatePicker hintText="Birth Date" mode="landscape" onChange={ this.getBirthDate }/>
              <RaisedButton  label="ADD" disabled={this.state.disableAddButton} primary={true} style={style} onTouchTap= {this.handleChange.bind(this,"addUser")}/>
          </form>
    		</div>
        {
          this.props.teacherReducer.error == true || this.props.teacherReducer.successSnackBar == true || this.state.validationInForm == true?
          (
            this.errorSnackBar(this.props.teacherReducer.errorMessage)
          )
          : null
        }

      </div>
    	)
    }
}

const mapStateToProps = (state) => {
  return {
      teacherReducer: state.teacherReducer,
      subjectReducer: state.subjectReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (details) => {
      dispatch(addUser(details))
    },
    setErrorMessage: (message) =>{
        dispatch(setErrorMessage(message));
    },
    resetToNoErrorSubject: () => {
      dispatch(resetToNoErrorSubject())
    },
    resetToNoErrorTeacher: () => {
      dispatch(resetToNoErrorTeacher())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacher);
