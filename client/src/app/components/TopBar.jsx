import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
  * A simple example of `AppBar` with an icon on the right.
  * By default, the left icon is a navigation-menu.
*/
const myStyle = {
  color: "white"
};
var buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  marginTop:12
};
var buttonStyle1 = {
  backgroundColor: 'transparent',
  color: 'white',
  marginLeft:0,
  marginTop:12
};
var buttonStyle3 = {
  backgroundColor: 'transparent',
  color: 'white',

};
class TopBar extends React.Component { 
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handle = this.handle.bind(this);
    this.handleRequestCurrentSessionClose = this.handleRequestCurrentSessionClose.bind(this);
    this.state = {
      name: "Manipal University",   
      open: false,                 
      currentSession : false
    };
  }
  getChildContext() {
    return 
      { 
        muiTheme: getMuiTheme(baseTheme) 
      };
  }
  handleTouchTap(event) {
  // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose() {
    this.setState({
      open: false,
    });
  };
  handleRequestCurrentSessionClose() {
    this.setState({
      currentSession: false,
    });
  };
  handle(event){
    event.preventDefault();
    this.setState({
      currentSession : true,
      anchorEl: event.currentTarget,
    });
  }
  render() {
    return(
      <MuiThemeProvider>
      {
        <AppBar
              title={
                <span  style={myStyle}>
                  <center>{ this.state.name }</center>
                </span>
              }
              iconElementLeft={
                <span  style={myStyle}>
                <FlatButton label="Current Session: 2013 - 2017" style={buttonStyle3} />
                </span>   
              }
              onLeftIconButtonTouchTap = {this.handle}>      
              <Popover
                open={this.state.currentSession}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestCurrentSessionClose}>
                <Menu>
                  <MenuItem primaryText="2012-2016" />
                  <MenuItem primaryText="2011-2015" />
                  <MenuItem primaryText="2010-2014" />
                </Menu>
              </Popover>
              <FlatButton label="Admin" style={buttonStyle} />
              <FlatButton label="Settings" style={buttonStyle} onTouchTap={this.handleTouchTap}/>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                >
                <Menu>
                  <MenuItem primaryText="Edit Profile" />
                  <MenuItem primaryText="Change Password" />
                </Menu>
              </Popover>
              <FlatButton label="Logout" style={buttonStyle} />
            </AppBar>
          }
      </MuiThemeProvider>
    );
  }
}
TopBar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default TopBar;