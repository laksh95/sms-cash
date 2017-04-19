import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class Student extends React.Component { 
   constructor(props) {
    super(props);
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
 render(){
   return(
     <div>
      <div>Student</div>
     </div>
    );
  }
}
export default Student;