import React from 'react'
import ReactDOM from 'react-dom'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { getTeacher, changeDetails, deleteTeacher, approveDetails, resetToNoErrorTeacher, setPagination } from '../../actions/teacherActions.js'
import { resetToNoErrorSubject } from '../../actions/subjectActions.js'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import {setErrorMessage} from './../../actions/errorActions'
import { browserHistory } from 'react-router'
import { validateEmail,isAllAlphabets } from '../../utils/validation.js'
require('rc-pagination/assets/index.css');
var moment = require('moment')
const Pagination = require('rc-pagination');

class AllTeacher extends React.Component{
    constructor(props) {
    	super(props);
    	this.props = props
    	this.state = {
      		openTeacherDialog: false,
          departmentSelected: [],
          editButtonHit: false,
          teacherName: null,
          email: null,
          joinDate: new Date(),
          designation: null,
          departmentIdForChangeDetails: null,
          disableSaveButton: false,
          emailInvalid: false,
          nameInvalid: false,
          designationInvalid: false
       	}
    }

    errorSnackBar = (errorMessage) => {
      if(this.props.teacherReducer.noDataError == false){
        return (
          <Snackbar
          open={true}
          message={errorMessage}
          autoHideDuration={4000}
          />
      )
      }
      else{
        return (
          <div id="labelErrorDiv" style= {{ marginTop: '17%', marginLeft: '20%' }}>
            <label style = {{color:'#808080', fontSize: 'xx-large'}}> NO DATA </label>
          </div>
        )
      }
    }
    // pageChange = (currentPage , size) =>{
    //     console.log("page change",currentPage)
    //     let teacher = this.props.teacherReducer.allTeacher
    //     let start = (currentPage-1)*10
    //     let end = start + 10
    //     let pagedTeachers = []
    //     for(let index in course){
    //         if(index>=start && index<end){
    //             pagedTeachers.push(teacher[index])
    //         }
    //     }
    //     let  data = {
    //         currentPage,
    //         pagedTeachers
    //     }
    //     this.props.setPagination(data)
    // }
    checkAllValidations = () => {
      if(this.state.emailInvalid == false && this.state.nameInvalid == false && this.state.designationInvalid == false){
        this.setState({
          disableSaveButton: false
        })
      }
      else{
        this.setState({
          disableSaveButton: true
        })
      }

    }
    handleTouchTap = (type, item, event) => {
      let teacher = {}
      switch(type){
        case "openEditDialog":
          this.setState({
            editButtonHit: true,
            departmentForChangeDetails: item.department_name,
            joinDate: new Date(item.joining_date),
            teacherName: item.teacher_name,
            email: item.teacher_email,
            designation: item.designation,
            departmentIdForChangeDetails: item.department_id,
          })
          break
        case "closeDialog":
          this.setState({
            editButtonHit: false,
            emailInvalid: false,
            nameInvalid: false,
            designationInvalid: false
          })
          break
        case "saveDetails":
          this.setState({
            editButtonHit: false
          })
          let details = {
            teacherId: item,
            name: this.state.teacherName,
            department: this.state.departmentIdForChangeDetails,
            departmentName: this.state.departmentForChangeDetails,
            email: this.state.email,
            joinDate: this.state.joinDate,
            designation: this.state.designation
          }
          this.props.changeDetails(details)
          this.setState({
            teacherName: null,
            departmentForChangeDetails: null,
            email: null,
            joinDate: null,
            designation: null,
            departmentIdForChangeDetails: null,
            emailInvalid: false,
            nameInvalid: false,
            designationInvalid: false
          })
          break
        case "getName":
          this.setState({
            teacherName: event
          })
          if(event == ""){
            this.setState({
              nameInvalid: true
            }, ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if ( isAllAlphabets(event)) {
              this.setState({
                nameInvalid: true
              },  ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                nameInvalid: false
              },  () => {
                this.checkAllValidations()
              })
            }
          }
          break
        case "getDesignation":
          this.setState({
            designation: event
          })
          if(event == ""){
            this.setState({
              designationInvalid: true
            },  ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if ( isAllAlphabets(event)) {
              this.setState({
                designationInvalid: true
              }, ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                designationInvalid: false
              },  ()=> {
                this.checkAllValidations()
              })
            }
          }
          break
        case "getEmail":
          this.setState({
            email: event
          })
          if(event == ""){
            this.setState({
              emailInvalid: true
            },  ()=> {
              this.checkAllValidations()
            })
          }
          else{
            if( validateEmail(event)){
              this.setState({
                emailInvalid: false
              },  ()=> {
                this.checkAllValidations()
              })
            }
            else{
              this.setState({
                emailInvalid: true
              },  ()=> {
                this.checkAllValidations()
              })
            }
          }
          break
        case "deleteTeacher":
          teacher = {
            teacherId: item
          }
          this.props.deleteTeacher(teacher)
          break
        case "approveDetails":
          teacher = {
            teacherId: item
          }
          this.props.approveDetails(teacher)
          break
        default:
          break
      }
    }
    /*gets the date and sets it as joining date for a teacher*/
    getDate = (event, date) => {
      this.setState({
        joinDate: date
      })
    }
    /*selecting departments*/
    handleChangeDepartment = (event, index, value) => {
      this.setState({
        departmentSelected: value
      })
    }
    handleChangeDepartmentForCHangeDetails = (event, index, value) => {
      let departmentId = null
      let departmentExisting = this.props.subjectReducer.department
      for(let index = 0; index<departmentExisting.length; index++){
        if(departmentExisting[index].name==value){
          departmentId = departmentExisting[index].id
          break
        }
      }
      this.setState({
        departmentForChangeDetails: value,
        departmentIdForChangeDetails: departmentId
      })
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
    /*displays all the teacehrs in cards*/
    teacherList = (data,index,style) => {
      return(
        <Card key={index}>
          <CardHeader
            title={data.teacher_name}
            subtitle={data.designation}
            avatar="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7LBEv8FJQGibN96zw-vWvm1M-9I3tTgomzbV8NzTQCxu1aCk8Rw4cmBo"
            actAsExpander={true}
          />
          {
            data.approved==false?
            <FlatButton key={index} label="APPROVE DETAILS"
              primary={true}
              style={{mergin: 12, marginLeft: '75%'}}
              onTouchTap={this.handleTouchTap.bind(this, "approveDetails", data.id)}/>
            :null
          }

          <CardText expandable={true}>
                <Table
               height={this.state.height}
               fixedHeader={this.state.fixedHeader}
               fixedFooter={this.state.fixedFooter}
               >
                <TableHeader displaySelectAll= {false}>
                   <TableRow>
                     <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                       Teacher Details
                     </TableHeaderColumn>
                   </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox= {false}>
                   <TableRow key={index}>
                     <TableRowColumn colSpan="2">Joine Date</TableRowColumn>
                     <TableRowColumn colSpan="3">{moment(data.joining_date).format("MMM Do YY")}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn colSpan="2">Experience (In years)</TableRowColumn>
                     <TableRowColumn colSpan="3">{data.experience_years}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn colSpan="2">Email ID</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.teacher_email}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn colSpan="2">Phone number</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.contact_number}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn colSpan="2">Email ID</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.alternate_number}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn colSpan="2">Experience Description</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.experience_description}</TableRowColumn>
                   </TableRow>
                </TableBody>
              </Table>
              <br/><br/>
              <FlatButton key={index}  label="EDIT" primary={true} style={style} onTouchTap={this.handleTouchTap.bind(event, "openEditDialog", data)}/>
              <Dialog
              modal={true}
              open={this.state.editButtonHit}
              onRequestClose={this.handleTouchTap.bind(event,"closeDialog")}
              >
                  <form>
                      <SelectField
                      floatingLabelText="Department"
                      value={this.state.departmentForChangeDetails}
                      onChange={this.handleChangeDepartmentForCHangeDetails}
                      >
                      {
                        this.props.subjectReducer.error===false?
                        (this.props.subjectReducer.department.map((department, index)=>{
                          return(
                            <MenuItem key={department.id} value={department.name} primaryText={department.name} />
                          )
                       })) :  this.errorSnackBar(this.props.subjectReducer.errorMessage)

                      }
                      </SelectField>
                      <br />
                      <TextField
                      floatingLabelText="Teacher name"
                      defaultValue={data.teacher_name}
                      onChange={ this.handleTouchTap.bind(event, "getName") }
                      />
                      <br />
                      <TextField
                      floatingLabelText="Teacher designation"
                      defaultValue={data.designation}
                      onChange={this.handleTouchTap.bind(this, "getDesignation")}
                      />
                      <br />
                      <TextField
                      floatingLabelText="Teacher Email ID"
                      defaultValue={data.teacher_email}
                      onChange={this.handleTouchTap.bind(this, "getEmail")}
                      />
                      <br /><br />
                      <DatePicker key={index} defaultDate={this.state.joinDate} hintText="Join Date" mode="landscape" onChange={ this.getDate }/>
                  </form>
                <RaisedButton key={index} label="SAVE" disabled={this.state.disableSaveButton} style={style} onTouchTap={this.handleTouchTap.bind(event, "saveDetails", data.id)}/>
                <RaisedButton key={index+1} label="CANCEL"  style={style} onTouchTap={this.handleTouchTap.bind(event, "closeDialog")}/>
              </Dialog>

            <FlatButton  label="DELETE" secondary={true} style={style} onTouchTap={this.handleTouchTap.bind(this, "deleteTeacher", data.id)}/>
          </CardText>
          </Card>
      )
    }


    render(){
      const style = {
        margin: 12
      }
    	return(
    		<div id="divTeacherMain">
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.handleChangeDepartment}
          multiple={true}
          >
          {
            this.props.subjectReducer.error===false?
            (this.props.subjectReducer.department.map((data, index)=>{
              return(
                <MenuItem key={data.id} value={data.name} primaryText={data.name} />
              )
           })) :  this.errorSnackBar(this.props.subjectReducer.errorMessage)
          }
          </SelectField>
    			{
            this.props.teacherReducer.status == 200 && this.props.teacherReducer.error === false && this.props.teacherReducer.allTeacher !== undefined?
    				(this.props.teacherReducer.allTeacher.map((data,index)=>{
                if(this.state.departmentSelected.length==0){
                  return this.teacherList(data,data.id,style)
                }
                else{
                  for(let index=0; index <this.state.departmentSelected.length; index++)
                  {
                    if(data.department_name==this.state.departmentSelected[index]){
                      return this.teacherList(data,data.id,style)
                    }
                  }
                }
    				})) : this.errorSnackBar(this.props.teacherReducer.errorMessage)
    			}
          {
            // <Pagination className="ant-pagination" defaultCurrent={1}
            //   total={this.props.teacherReducer.totalPages}
            //   current={this.props.teacherReducer.currentPage}
            //   defaultPageSize={10}
            //   onChange={this.pageChange}
            // />
          }


    		</div>
    	)
    }
}

const mapStateToProps = (state) => {
  return {
    teacherReducer: state.teacherReducer,
    subjectReducer: state.subjectReducer,
    headerReducer: state.headerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacher: () => {
      dispatch(getTeacher())
    },
    changeDetails: (details) => {
      dispatch(changeDetails(details))
    },
    deleteTeacher: (teacherId) => {
      dispatch(deleteTeacher(teacherId))
    },
    approveDetails: (teacherId) => {
      dispatch(approveDetails(teacherId))
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
  //   setPagination:(data)=>{
  //       dispatch(setPagination(data))
  //   }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTeacher);
