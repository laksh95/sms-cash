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
import DashBoard from './DashBoard.jsx';
import Course  from './Course.jsx'
import renderIf from 'render-if'
import Student from './student/Student.jsx'
import {Link} from 'react-router'
const events = [
    {
        start:'2015-07-20',
        end:'2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];
export default class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        course : false,
        student: false

    }
    this.course= this.course.bind(this)
      /*this.student=this.student.bind(this)*/
  }
  course(){
    console.log("inside course")
    this.setState({
        course : true,
        student:false
    })
  }
/*  student(){
      this.setState({
        student:true,
          course:false
      })
  }*/
  componentWillReceiveProps(props){
      this.props = props
  }
  componentWillMount(){

  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
   }
  render() {
    let sizeWidth = 230;
    if( this.props.open === false){
     sizeWidth = 70;
    }
    return (
        <div>
         <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true}>
          <AppBar title="Menu"
           onLeftIconButtonTouchTap = {this.props.handleToggle} />
            <List>
                <ListItem
                    primaryText="DashBoard "
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}

                />
                <Link to="course">
                    <ListItem
                        primaryText="Course"
                        onClick={()=>this.course()}
                        leftAvatar={<Avatar src={require('./../images/user.png')} />}
                    />
                </Link>
                <Link to="student">
                <ListItem
                    primaryText="Student"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                />
                </Link>
                <ListItem
                    primaryText="Teacher"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                />
                <ListItem
                    primaryText="Subjects"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                />
              <ListItem
                primaryText="Events"
                leftAvatar={<Avatar src={require('./../images/user.png')} />}
              />
            </List>
            <Divider />
            <List>
                <ListItem
                    primaryText="Important"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                />
                <ListItem
                    primaryText="Teachers/Students"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
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