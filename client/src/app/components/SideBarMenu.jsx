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
import DashBoard from '../containers/Dashboard/DashBoard.jsx'; 
let userImage =  require('./../images/user.png');
import {Link} from 'react-router';
import { browserHistory} from 'react-router';
export default class SideBarMenu extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      selected:"Dashboard"
    };
  }
  componentWillMount() {
     if(!this.props.isLogin){
        browserHistory.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!this.props.isLogin){
        browserHistory.push('/');
    }
  }
 getChildContext(){
    return { muiTheme: getMuiTheme(baseTheme) };
 }  
 handleTouchTap = (item , event) => {
        this.setState({
              selected: item
                });
   };  
  render() { 
    var list = [
      "Department":'white',
      "Dashboard":'white',
      "Students":'white',
      "Teacher":'white',
      "Subjects":'white',
      "Events":'white',
      "Important":'white',
      "T/S":'white'
      ];

    list[this.state.selected] = '#e3e7ea';
    let sizeWidth = 230;
    if( this.props.open === false){
     sizeWidth = 70;
    }

    return (
      <div>
        <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true} >
          <AppBar title="Menu"
        onLeftIconButtonTouchTap = {this.props.handleToggle} />
            {
              (this.props.user.role) ?       

           ( <List>
              {this.props.user.role.isAdmin ?
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="DashBoard"
                  leftAvatar={<Avatar src={userImage}
                   />} 
                   style={{backgroundColor: list["Dashboard"]}}
                   onTouchTap = {(event)=>handleTouchTap( "Dashboard",event)}
                />
              </Link> : null}
            </List>): null}
            
        </Drawer>
      </div>
    );
  }
}
SideBarMenu.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
SideBarMenu.contextTypes = { 
  router: React.PropTypes.object.isRequired
};