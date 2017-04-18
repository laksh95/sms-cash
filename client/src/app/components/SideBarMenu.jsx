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
import DashBoard from './dashboard/DashBoard.jsx';
let userImage =  require('./../images/user.png');
import {Link} from 'react-router';
import { browserHistory} from 'react-router';
import { getSelected } from '../actions/adminActions.jsx';
import { connect } from 'react-redux';



class SideBarMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected:this.props.adminReducer.selectedTab
    };
  }

  componentWillMount() {
    //  if(!this.props.isLogin){
    //     browserHistory.push('/');
    // }

    console.log("Hello");
  }

  componentWillReceiveProps(nextProps) {
    // if(!this.props.isLogin){
    //     browserHistory.push('/');
    // }
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
   var list = {
      "/department":'white',
      "/dashboard":'white',
      "/students":'white',
      "/teachers":'white',
      "/subjects":'white',
      "/events":'white',
      "/important":'white',
      "/feedback":'white'
      };

 list[this.props.adminReducer.selectedTab] = '#e3e7ea';

 if(this.props.adminReducer.selectedTab === '/'){

   list['/dashboard'] = '#e3e7ea';
 }
    let sizeWidth = 230;
    if( this.props.open === false){
     sizeWidth = 70;
    }

    return (
      <div>
        <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true} >
          <AppBar title="Menu"
           onLeftIconButtonTouchTap = { () => this.props.handleToggle('Sidebar')} />

            {
              (this.props.user.role) ?

           ( <List>

              {this.props.user.role.isAdmin ?
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="DashBoard"
                  leftAvatar={<Avatar src={userImage}
                   />}
                   style={{backgroundColor: list["/dashboard"]}}
                   onTouchTap = {this.handleTouchTap.bind(this, "/dashboard")}
                />
              </Link> : null}
              <Link to ="/department" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Department"
                  leftAvatar={<Avatar src={userImage} />}
                   style={{backgroundColor: list["/department"]}}
                      onTouchTap = {this.handleTouchTap.bind(this,"/department")}
                />
              </Link>

              <Link to ="/student" style={{textDecoration: 'none'}}>
               <ListItem
                 primaryText="Student"
                 leftAvatar={<Avatar src={userImage} />}
                   style={{backgroundColor: list["/student"]}}
                       onTouchTap = {this.handleTouchTap.bind(this,"/student")}
               />
              </Link>

              <Link to ="/teachers" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Teacher"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{backgroundColor: list["/teachers"]}}
                  onTouchTap = {this.handleTouchTap.bind(this,"/teachers")}
                />
              </Link>

              <Link to ="/feedback" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Feedback"
                  leftAvatar={<Avatar src={userImage} />}
                  style={{backgroundColor: list["/feedback"]}}
                  onTouchTap = {this.handleTouchTap.bind(this,"/feedback")}
                />
              </Link>

              <ListItem
                primaryText="Subjects"
                leftAvatar={<Avatar src={userImage} />}
                 style={{backgroundColor: list["/subjects"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"/subjects")}

              />
              <ListItem
                primaryText="Events"
                leftAvatar={<Avatar src={userImage} />}
                 style={{backgroundColor: list["/events"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"/events")}
              />
            </List>): null}
            <Divider />
            <List>
              <ListItem
                primaryText="Important"
                leftAvatar={<Avatar src={userImage} />}
                  style={{backgroundColor: list["/important"]}}
                 onTouchTap = {this.handleTouchTap.bind(this,"/important")}
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


const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer
    }
}

export default connect(mapStateToProps)(SideBarMenu);
