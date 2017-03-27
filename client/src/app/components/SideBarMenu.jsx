import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'react-bootstrap';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import DashBoard from './Dashboard/DashBoard.jsx'; 
let userImage =  require('./../images/user.png');
import {Link} from 'react-router';

export default class SideBarMenu extends React.Component {
  
  constructor(props) {
    super(props); 
  }


  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
   }
  
  
  render() { 

    const contentStyle = {
       marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
     };

    if (this.props.open) {
      contentStyle.marginLeft = 250;
    }

    let sizeWidth = 230;
    if( this.props.open === false){
     sizeWidth = 70;
    }
    return (
      <div>
        <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true} >
          <AppBar title="Menu"
           onLeftIconButtonTouchTap = {this.props.handleToggle} />

            <List>
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="DashBoard"
                  leftAvatar={<Avatar src={userImage} />} 
                />
              </Link>
              <Link to ="/department" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Department"
                  leftAvatar={<Avatar src={userImage} />} 
                />
              </Link>
              <ListItem
                primaryText="Student" 
                leftAvatar={<Avatar src={userImage} />}
              />
              <ListItem
                primaryText="Teacher"
                leftAvatar={<Avatar src={userImage} />}
              />
              <ListItem
                primaryText="Subjects"
                leftAvatar={<Avatar src={userImage} />}
                
              />
              <ListItem
                primaryText="Events"
                leftAvatar={<Avatar src={userImage} />} 
              />
            </List>
            <Divider />
            <List>
              <ListItem
                primaryText="Important"
                leftAvatar={<Avatar src={userImage} />}
              />
              <ListItem
                primaryText="Teachers/Students"
                leftAvatar={<Avatar src={userImage} />}
              />
            </List>
        </Drawer>

  </div>
    );
  }
}

SideBarMenu.childContextTypes = {
            muiTheme : React.PropTypes.object.isRequired
};
SideBarMenu
.contextTypes = {
    router: React.PropTypes.object.isRequired
};


