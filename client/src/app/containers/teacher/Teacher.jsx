import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import store from './../../store'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import axios from 'axios'
import AllTeacher from './AllTeacher.jsx'
import AddTeacher from './AddTeacher.jsx'
import renderIf from 'render-if'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getTeacher, resetToNoErrorTeacher } from './../../actions/teacherActions.js'
import { getSelected } from '../../actions/adminActions.js'
import { connect } from 'react-redux'
import { getSubjectAndDepartment, resetToNoErrorSubject } from '../../actions/subjectActions.js'
import Snackbar from 'material-ui/Snackbar'
import {setErrorMessage} from './../../actions/errorActions'

class Teacher extends React.Component{
    constructor(props) {
      super(props);
      this.props = props
    }

    getChildContext() {
       return { muiTheme: getMuiTheme(baseTheme) };
    }

    errorSnackBar = (errorMessage) => {
        return (
          <Snackbar
          open={true}
          message={errorMessage}
          autoHideDuration={4000}
          />
        )
    }

    componentWillMount() {
      this.props.resetToNoErrorTeacher()
      this.props.resetToNoErrorSubject()
      if(this.props.headerReducer.selectedCourseId == ""){
        this.errorSnackBar("Select Course")
      }
      else{
        this.props.getTeacher({"courseId":this.props.headerReducer.selectedCourseId})
        this.props.getSubjectAndDepartment({"courseId":this.props.headerReducer.selectedCourseId})
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.headerReducer.selectedCourseId !== this.props.headerReducer.selectedCourseId){
        this.props.getTeacher({"courseId":this.props.headerReducer.selectedCourseId})
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

    render(){
    const tabStyle = { marginTop:10, marginLeft: 50, marginRight: 50 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' }
      return(
        <div>
          <Tabs style={tabStyle}>
            <Tab label="Manage Teacher">
                <AllTeacher/>
            </Tab>
            <Tab label="Add Teachers">
                <AddTeacher/>
            </Tab>
          </Tabs>
        </div>
      )
    }
}
(Teacher).childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
    teacherReducer: state.teacherReducer,
    subjectReducer: state.subjectReducer,
    headerReducer: state.headerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacher: (details) => {
      dispatch(getTeacher(details))
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

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
