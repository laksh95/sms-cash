import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Tabs, Tab} from 'material-ui/Tabs'
import AddStudent from './addStudent.jsx'
import AddBulkStudent from './addBulkStudent.jsx'
import StudentInformation from './StudentInformation.jsx'
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline'
class Student extends React.Component { 
   constructor(props) {
       super(props);
       this.state={
           value:'a'
       }
       this.handleChange=this.handleChange.bind(this)
  }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
  handleChange=(value)=>{
       this.setState({
           value:value
       })
  }
 render() {
     const centerContent = { marginTop:10, marginLeft: 250 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' }
       return(
           <div id="studentContentHeader">
               <Tabs
                   value={this.state.value}
                   onChange={this.handleChange}>
                   <Tab label="Student Information" value="a">
                       <StudentInformation />
                   </Tab>
                   <Tab label="Add Student" value="b">
                      <AddStudent />
                   </Tab>
                   <Tab label="Add Bulk Students"  value="c">
                       <AddBulkStudent />
                   </Tab >
                   <Tab label="Student Registration" value="d">
                   </Tab>
               </Tabs>
           </div>


       )
   }
}
(Student).childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Student;


