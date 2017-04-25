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
import { getTeacher } from './../../actions/teacherActions.js'
import { getSelected } from '../../actions/adminActions.js'
import { connect } from 'react-redux'
import { getSubjectAndDepartment, resetToNoErrorSubject } from '../../actions/subjectActions.js'

class Teacher extends React.Component{
    constructor(props) {
      super(props);
      this.props = props
    }

    getChildContext() {
       return { muiTheme: getMuiTheme(baseTheme) };
    }

    componentWillMount() {
      if(this.props.headerReducer.selectedCourseId == ""){
        errorSnackBar("Select Course")
      }
      else{
        this.props.getTeacher({"courseId":this.props.headerReducer.selectedCourseId})
        this.props.getSubjectAndDepartment({"courseId":this.props.headerReducer.selectedCourseId})
      }
    }

    componentWillGetProps(nextProps){
      this.props = nextProps
      //add the error page thing Not done yet
    }

    render(){
    const tabStyle = { marginTop:10, marginLeft: 50, marginRight: 50 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' }
      return(
        <div>
          <Tabs style={tabStyle}>
            <Tab label="Show Teacher">
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
