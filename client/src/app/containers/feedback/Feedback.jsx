import React from 'react'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { getSelected } from '../../actions/adminActions.jsx'
import { connect } from 'react-redux'
import { getTeacherAndFeedback } from './../../actions/teacherActions.jsx'
import { getSubjectAndDepartment } from './../../actions/subjectActions.jsx'
import {List, ListItem} from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ActionFace from 'material-ui/svg-icons/action/face'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import Snackbar from 'material-ui/Snackbar'

class Feedback extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      department: "Department",
      selectedDepartment: [],
      selectedSubject: [],
      subjectId: []
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentWillMount() {
    this.props.getTeacherAndFeedback({
	     "offset": 0,
	     "limit":2,
	     "course_id": 1,
       "snackBarState": false
    })
    this.props.getSubjectAndDepartment({"courseId":1})
  }
  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    })
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }
  errorSnackBar = (errorMessage) => {
    return(
      <Snackbar
        open={true}
        message={errorMessage}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
  teacherList = (dataTeacher, index) => {
    return(
      <Card key={index}>
       <CardHeader
         title={dataTeacher.user_name}
         subtitle={dataTeacher.designation}
         actAsExpander={true}
         showExpandableButton={true}
         avatar="images/jsa-128.jpg"
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

  selectDepartment = (event, index, values) => {
    this.setState({
      selectedDepartment: values
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
         this.props.subjectReducer.department.map((data, index)=>{
           return(
             <MenuItem key={index} value={data.name} primaryText={data.name} />
           )
        })
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
         this.props.subjectReducer.subject.map((data, index)=>{
           return(
             <MenuItem key={index} value={data.subject.name} primaryText={data.subject.name} />
           )
        })
      }
       </SelectField>
       <br/>
          {
            this.props.teacherReducer.status == 200?
            this.props.teacherReducer.allTeacher.map((data,index)=>{
                let noSubject = 0
                let noDepartment = 0
                if(this.state.selectedSubject.length==0){
                  noSubject = 1
                }
                if(this.state.selectedDepartment.length==0){
                  noDepartment = 1
                }
                if(noSubject == 1 && noDepartment == 1){
                  return this.teacherList(data, index)
                }
                if(noSubject == 1 && noDepartment == 0){
                  for(let index=0; index <this.state.selectedDepartment.length; index++){
                    if(data.department.name==this.state.selectedDepartment[index]){
                      return this.teacherList(data, index)
                    }
                  }
                }
                if(noSubject == 0 && noDepartment == 1){
                  for(let index=0; index < this.state.subjectId.length; index++){
                    for(let index2=0; index2 < data.teacher_subject_allocations.length; index2++){
                      if(data.teacher_subject_allocations[index2].subject_id==this.state.subjectId[index]){
                        return this.teacherList(data, index)
                      }
                    }
                  }
                }
                if(noSubject == 0 && noDepartment == 0){
                  for(let index=0; index < this.state.subjectId.length; index++){
                    for(let index2 = 0; index2< this.state.selectedDepartment.length; index2 ++){
                      for(let index3=0; index3 < data.teacher_subject_allocations.length; index3++){
                        if(data.teacher_subject_allocations[index3].subject_id==this.state.subjectId[index] && data.department.name==this.state.selectedDepartment[index2]){
                          return this.teacherList(data, index)
                        }
                      }
                    }
                  }
                }
    				})
            : this.errorSnackBar(this.props.teacherReducer.errorMessage)
    			}
     </div>
    );
  }
}

Feedback.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
}

Feedback.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    teacherReducer: state.teacherReducer,
    subjectReducer: state.subjectReducer
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
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
