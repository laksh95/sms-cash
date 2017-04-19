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
let departmentImage =  require('./../images/department.png');
let studentImage =  require('./../images/student.png');
let dashboardImage =  require('./../images/dashboard.png');
import {Link} from 'react-router';
import { browserHistory} from 'react-router';
import { getSelected } from '../actions/adminActions.jsx';
import { connect } from 'react-redux';



class SideBarMenu extends React.Component {
  
  constructor(props) {
    super(props); 

    this.state = {
      selected:this.props.adminReducer.selectedTab,
      refresh: true
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.refresh){
      console.log("+++prevPathName+++: ", this.props.prevPathName);
      let selected ="";
      let path= this.props.prevPathName.trim();
      if(path=="/dashboard" || path=="/")
        selected= "Dashboard"
      else if(path=='/department')
        selected= "Department"
      else if(path=='/student')
        selected= "Students"

      if(this.state.selected!=selected){
        this.setState({selected: selected})
      }
    }
  }


 
 getChildContext(){
    return { muiTheme: getMuiTheme(baseTheme) };
 }
  
 handleTouchTap = (item , event) => {
  console.log("Selected: +++",item )
        this.setState({
              refresh: false,
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

    list[this.state.selected] = '#e3e7ea'
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

               {
                /*this.props.user.role.isAdmin?
              <Link to ="/testAdmin" style={{textDecoration: 'none'}}>
                 <ListItem
                   primaryText="TEST ADMIN"
                   leftAvatar={<Avatar src={userImage} />} 
                 />
              </Link> : null*/
            }

               {/*(this.props.user.role.isTeacher || this.props.user.role.isDirector) ?
              <Link to ="/testTeacher" style={{textDecoration: 'none'}}>
                 <ListItem
                   primaryText="TEST TEACHER"
                   leftAvatar={<Avatar src={userImage} />} 
                 />
              </Link> 
              : null*/}

              {this.props.user.role.isAdmin ?
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="DashBoard"
                  leftAvatar={<Avatar src={dashboardImage}
                   />} 
                   style={{backgroundColor: list["Dashboard"]}}
                   onTouchTap = {this.handleTouchTap.bind(this, "Dashboard")}
                />
              </Link> : null}
              <Link to ="/department" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Department"
                  leftAvatar={<Avatar src={departmentImage} />} 
                   style={{backgroundColor: list["Department"]}}
                      onTouchTap = {this.handleTouchTap.bind(this,"Department")}
                />
              </Link>

              <Link to ="/student" style={{textDecoration: 'none'}}>
               <ListItem
                 primaryText="Student" 
                 leftAvatar={<Avatar src={userImage} />}
                   style={{backgroundColor: list["Students"]}}
                       onTouchTap = {this.handleTouchTap.bind(this,"Students")}
               />
              </Link>
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


const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer
    }
}

export default connect(mapStateToProps)(SideBarMenu);
