import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


class DashBoard extends React.Component { 
   constructor(props) {
    super(props);
    }
  
   getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
  
   render(){
     return(
         <div>
           <div>DashBoard</div>
         </div>
         );
    }
}

DashBoard.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
DashBoard.contextTypes = { 
    router: React.PropTypes.object.isRequired
};

export default DashBoard;


