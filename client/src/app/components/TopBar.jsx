import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 100,
  fontFamily: 'Roboto, sans-serif'
  },
});


class TopBar extends React.Component { 
   constructor(props) {
    super(props);
    this.handleToggle =  this.handleToggle.bind(this);
    this.state = {open: false,           
                 };
  
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
  
   handleToggle() { this.setState({open: !this.state.open});}


 render() {


  return(

   <MuiThemeProvider muiTheme={muiTheme}>
  <AppBar
   
    title={<span  style={{ marginLeft:'0%'}}>M A N I P A L &nbsp;&nbsp; U N I V E R S I T Y </span>}
    iconClassNameRight=""
    iconClassNameLeft={<center></center>}

     
  />
  </MuiThemeProvider>
);

}
}

TopBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };
export default TopBar;


