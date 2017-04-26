import React from 'react'
import AppBar from 'material-ui/AppBar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { connect } from 'react-redux'
import { getTeacherAndFeedback, resetToNoErrorTeacher } from '../../actions/teacherActions.js'
import { getSubjectAndDepartment, resetToNoErrorSubject } from '../../actions/subjectActions.js'
import {List, ListItem} from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ActionFace from 'material-ui/svg-icons/action/face'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import Snackbar from 'material-ui/Snackbar'
import {setErrorMessage} from './../../actions/errorActions'
import { browserHistory } from 'react-router'
import { Image } from 'material-ui-image'

class Feedback extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      department: "Department",
      selectedDepartment: [],
      selectedSubject: [],
      subjectId: [],
      open: false,
      errorMessage: ""
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
  teacherList = (dataTeacher, index) => {
    return(
      <Card key={index}>
       <CardHeader
         title={dataTeacher.user_name}
         subtitle={dataTeacher.designation}
         actAsExpander={true}
         showExpandableButton={true}
         avatar="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7LBEv8FJQGibN96zw-vWvm1M-9I3tTgomzbV8NzTQCxu1aCk8Rw4cmBo"
       />
       <CardText expandable={true}>
        <div>
          <List>
            <ListItem primaryText={dataTeacher.averageFeedback.finalScore} leftIcon={<ActionGrade />} />
            <ListItem primaryText={dataTeacher.averageFeedback.type} leftIcon={<ActionFavorite />} />
            <ListItem primaryText={dataTeacher.averageFeedback.subjectName} leftIcon={<ActionAssignment />} />
          </List>
        </div>
       </CardText>
     </Card>
    )
  }
  componentWillMount() {
    this.props.resetToNoErrorTeacher()
    this.props.resetToNoErrorSubject()
    if(this.props.headerReducer.selectedCourseId == ""){
      this.errorSnackBar("Select Course")
    }
    else{
      this.props.getTeacherAndFeedback({
         "offset": 0,
         "limit":2,
         "course_id": this.props.headerReducer.selectedCourseId
      })
      this.props.getSubjectAndDepartment({"courseId":this.props.headerReducer.selectedCourseId})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.headerReducer.selectedCourseId !== this.props.headerReducer.selectedCourseId){
      // this.props.resetToNoErrorTeacher()
      // this.props.resetToNoErrorSubject()
      this.props.getTeacherAndFeedback({
         "offset": 0,
         "limit":2,
         "course_id": nextProps.headerReducer.selectedCourseId
      })
      this.props.getSubjectAndDepartment({"courseId": nextProps.headerReducer.selectedCourseId})
    }
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

  selectDepartment = (event, index, values) => {
    this.setState({
      selectedDepartment: values
    })
  }
  selectSubject = (event, index, values) => {
    this.setState({
      selectedSubject: values
    })

    let subjectIdTemporary = []

    let subjectInList = this.props.subjectReducer.subject

    for(let index1 = 0; index1< values.length; index1++){
      for(let index2 = 0; index2<subjectInList.length ; index2 ++){
          if(values[index1]===subjectInList[index2].subject.name){
            subjectIdTemporary.push(subjectInList[index2].subject.id)
          }
      }
    }
    this.setState({
      subjectId: subjectIdTemporary
    })
  }

 render() {
   return(
     <div id="mainDIv">
       &nbsp;&nbsp;
       <SelectField
          floatingLabelText="Department"
          value={this.state.selectedDepartment}
          onChange={this.selectDepartment}
          multiple={true}
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
       &nbsp;&nbsp;
       <SelectField
         floatingLabelText="Subject"
         value={this.state.selectedSubject}
         onChange={this.selectSubject}
         multiple={true}
       >
       {
         this.props.subjectReducer.errorSubject===false?
         (this.props.subjectReducer.subject.map((data, index)=>{
           return(
             <MenuItem key={index} value={data.subject.name} primaryText={data.subject.name} />
           )
         })) : (
             <MenuItem key={1} disabled={true} value='No data' primaryText='No data' />
           )

      }
       </SelectField>
       <br/>
          {
            this.props.teacherReducer.status == 200 && this.props.teacherReducer.error == false && this.props.teacherReducer.allTeacherAndFeedback !== undefined?
            this.props.teacherReducer.allTeacherAndFeedback.map((data,id)=>{
                let noSubject = 0
                let noDepartment = 0
                if(this.state.selectedSubject.length === 0){
                  noSubject = 1
                }
                if(this.state.selectedDepartment.length==0){
                  noDepartment = 1
                }
                if(noSubject == 1 && noDepartment == 1){
                  return this.teacherList(data, id)
                }
                if(noSubject == 1 && noDepartment == 0){
                  for(let index=0; index <this.state.selectedDepartment.length; index++){
                    if(data.department.name==this.state.selectedDepartment[index]){
                      return this.teacherList(data, id)
                    }
                  }
                }
                if(noSubject == 0 && noDepartment == 1){
                  for(let index=0; index < this.state.subjectId.length; index++){
                    for(let index2=0; index2 < data.teacher_subject_allocations.length; index2++){
                      if(data.teacher_subject_allocations[index2].subject_id==this.state.subjectId[index]){
                        return this.teacherList(data, id)
                      }
                    }
                  }
                }
                if(noSubject == 0 && noDepartment == 0){
                  for(let index=0; index < this.state.subjectId.length; index++){
                    for(let index2 = 0; index2< this.state.selectedDepartment.length; index2 ++){
                      for(let index3=0; index3 < data.teacher_subject_allocations.length; index3++){
                        if(data.teacher_subject_allocations[index3].subject_id==this.state.subjectId[index] && data.department.name==this.state.selectedDepartment[index2]){
                          return this.teacherList(data, id)
                        }
                      }
                    }
                  }
                }
    				})
            : this.errorSnackBar(this.props.teacherReducer.errorMessage)
    			}
     </div>
    )
  }
}

Feedback.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    teacherReducer: state.teacherReducer,
    subjectReducer: state.subjectReducer,
    headerReducer: state.headerReducer,
    errorRedu
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getDepartmentList: (course) => {
        dispatch(getDepartmentList(course))
      },
      getTeacherAndFeedback: (data) => {
        dispatch(getTeacherAndFeedback(data))
      },
      getSubjectAndDepartment: (data) => {
        dispatch(getSubjectAndDepartment(data))
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
