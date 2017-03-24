import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Tabs, Tab} from 'material-ui/Tabs'
import AddStudent from './adminAddStudent.jsx'

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
       return(
           <div>
               <div>Student</div>
               <div>
                   <Tabs
                       value={this.state.value}
                       onChange={this.handleChange}>
                       <Tab label="Add Student" value="a">
                          <AddStudent/>
                       </Tab>
                       <Tab label="Add Bulk Students" value="b">
                       </Tab >
                       <Tab label="Student Information" value="c">
                       </Tab>
                       <Tab label="Student Registration" value="d">
                       </Tab>
                   </Tabs>
               </div>

           </div>

       )
   }
}
(Student).childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Student;


