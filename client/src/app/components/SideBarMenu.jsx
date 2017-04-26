import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {browserHistory } from 'react-router';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import DashBoard from './../containers/Dashboard/App.jsx';
let userImage =  require('./../images/user.png');
let departmentImage =  require('./../images/department.png');
let studentImage =  require('./../images/student.png');
let dashboardImage =  require('./../images/dashboard.png');
let courseImage =  require('./../images/curriculum.png');
let feedbackImage =  require('./../images/feedback.png');
let blogImage =  require('./../images/blog.png');
import {Link} from 'react-router';
import { getSelected } from '../actions/adminActions.js';
import { connect } from 'react-redux';

class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:this.props.headerReducer.selectedTab,
      refresh: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.refresh){
      console.log("+++prevPathName+++: ", this.props.prevPathName);
      let selected ="";
      let path= this.props.prevPathName.trim();
       if(path ==="/dashboard" || path === "/")
           selected= "Dashboard"
       else if(path === '/department')
           selected= "Department"
       else if(path === '/student')
           selected= "Students"
       else if(path === '/course')
           selected = 'Course'
        else if(path === '/blog')
            selected = 'Blog'
        else if(path === '/feedback')
            selected = 'Feedback'
      if(this.state.selected !== selected){
        this.setState({selected: selected})
      }
    }
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
        "Course": "white",
        "Students": 'white',
        "Teacher": 'white',
        "Subjects": 'white',
        "Events": 'white',
        "Important": 'white',
        "Blog":'white',
        "T/S": 'white',
        "Feedback": 'white'
        }
    list[this.state.selected] = '#e3e7ea'
    let sizeWidth = 230;
    if( this.props.open === false){
     sizeWidth = 70;
    }
    return (
      <div>
        <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true} >
          <AppBar title="Menu" zDepth={0} 
            style={{height:'9.2%'}}
           onLeftIconButtonTouchTap = { () => this.props.handleToggle('Sidebar')} />
            {
              (this.props.user.role) ?
           ( <List>

              {this.props.user.role.isAdmin ?
              <Link to ="/dashboard" style={{textDecoration: 'none'}}>

                <ListItem
                  primaryText="DashBoard"
                  leftIcon={ <img  src={dashboardImage}
                   />} 
                   style={{backgroundColor: list["Dashboard"]}}
                   onTouchTap = {this.handleTouchTap.bind(this, "Dashboard")}
                />
   
              </Link> : null}
              <Link to ="/department" style={{textDecoration: 'none'}}>
                <ListItem
                  primaryText="Department"

                  leftIcon={ <img  src={departmentImage}
                   />} 
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

               {this.props.user.role.isAdmin ?
                   <Link to ="/blog" style={{textDecoration: 'none'}}>
                       <ListItem
                           primaryText="Blog"
                           leftIcon={ <img  src={blogImage}
                           />} 
                           style={{backgroundColor: list["Blog"]}}
                           onTouchTap = {this.handleTouchTap.bind(this, "Blog")}
                       />
                   </Link> : null}
               {this.props.user.role.isAdmin ?
                   <Link to ="/course" style={{textDecoration: 'none'}}>
                       <ListItem
                           primaryText="Course"
                           leftIcon={ <img  src={courseImage}
                            />} 
                           style={{backgroundColor: list["Course"]}}
                           onTouchTap = {this.handleTouchTap.bind(this, "Course")}
                       />
                   </Link> : null}

                   <Link to ="/feedback" style={{textDecoration: 'none'}}>
                     <ListItem
                       primaryText="Feedback"
                       leftIcon={ <img  src={feedbackImage}
                        />} 
                       style={{backgroundColor: list["Feedback"]}}
                       onTouchTap = {this.handleTouchTap.bind(this,"Feedback")}
                     />
                   </Link>
                </List>): null}
        </Drawer>

  </div>
    );
  }
}
SideBarMenu.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    headerReducer: state.headerReducer
    }
}

export default connect(mapStateToProps)(SideBarMenu);
