import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


class Department extends React.Component { 
   constructor(props) {
    super(props);

  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
 

 render() {
   return(
     <div>
        <h1>Department</h1> 
     </div>
    );
  }
}

Department.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };
export default Department;


