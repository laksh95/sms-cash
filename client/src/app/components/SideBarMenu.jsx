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
    let list = {
        "Department": 'white',
        "Dashboard": 'white',
        "Students": 'white',
        "Teacher": 'white',
        "Subjects": 'white',
        "Events": 'white',
        "Important": 'white',
        "T/S": 'white'
        }

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

               {this.props.user.role.isAdmin?
              <Link to ="/testAdmin" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="TEST ADMIN"
                  leftAvatar={<Avatar src={userImage} />} 
                />
              </Link> : null}

               {(this.props.user.role.isTeacher || this.props.user.role.isDirector) ?
              <Link to ="/testTeacher" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="TEST TEACHER"
                  leftAvatar={<Avatar src={userImage} />} 
                />
              </Link> : null}

              {this.props.user.role.isAdmin ?
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="DashBoard"
                  leftAvatar={<Avatar src={userImage}
                   />} 
                   style={{backgroundColor: list["Dashboard"]}}
                   onTouchTap = {this.handleTouchTap.bind(this, "Dashboard")}
                />
              </Link> : null}
              <Link to ="/department" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Department"
                  leftAvatar={<Avatar src={userImage} />} 
                   style={{backgroundColor: list["Department"]}}
                      onTouchTap = {this.handleTouchTap.bind(this,"Department")}
                />
              </Link>
               <Link to="/student" style={{textDecoration: 'none'}}>
                  <ListItem
                    primaryText="Student"
                    leftAvatar={<Avatar src={userImage} />}
                      style={{backgroundColor: list["Student"]}}
                          onTouchTap = {this.handleTouchTap.bind(this,"Student")}
                  />
               </Link>
              <ListItem
                primaryText="Teacher"
                leftAvatar={<Avatar src={userImage} />}
                 style={{backgroundColor: list["Teacher"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"Teacher")}
              />
              <ListItem
                primaryText="Subjects"
                leftAvatar={<Avatar src={userImage} />}
                 style={{backgroundColor: list["Subjects"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"Subjects")}
                
              />
              <ListItem
                primaryText="Events"
                leftAvatar={<Avatar src={userImage} />} 
                 style={{backgroundColor: list["Events"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"Events")}
              />
            </List>): null}
            <Divider />
            <List>
              <ListItem
                primaryText="Important"
                leftAvatar={<Avatar src={userImage} />}
                  style={{backgroundColor: list["Important"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"Important")}
              />
              <ListItem
                primaryText="Teachers/Students"
                leftAvatar={<Avatar src={userImage} />}
                  style={{backgroundColor: list["T/S"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"T/S")}
              />
            </List>
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
