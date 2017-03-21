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
import DashBoard from './../components/DashBoard.jsx';
import DashBoardNumberOfRole from './../components/DashBoardNumberOfRole.jsx';
import {store} from "../store.js";
import {connect} from "react-redux";
import {getParentCount,getStudentCount,getTeacherCount,getEvents} from '../actions/getDataAction.jsx'

class DrawerOpenRightExample extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
      axios.post('http://localhost:1234/api/academicCalendar/dashboard/getInitialData',{
        userId:'1'
      })
      .then((response)=> {
        console.log("success",response);
        let events=this.props.data.events;
        for(let i in response.data.totalHoliday)
        {
          let event1={
            start:new Date(response.data.totalHoliday[i].start_date),
            end:new Date(response.data.totalHoliday[i].start_date),
            content:response.data.totalHoliday[i].content,
            type:response.data.totalHoliday[i].type,
            title:response.data.totalHoliday[i].content
          }
          events.push(event1)
        } 
        for(let i in response.data.personalCalendar)
        {
          let event1={
            start:new Date(response.data.personalCalendar[i].start_date),
            end:new Date(response.data.personalCalendar[i].start_date),
            content:response.data.personalCalendar[i].content,
            type:response.data.personalCalendar[i].heading,
            title:response.data.personalCalendar[i].heading
          }
          events.push(event1)
        }   
        this.props.getEvents(events)
        this.props.getParentCount(response.data.totalParent)
        this.props.getTeacherCount(response.data.totalStudents)
        this.props.getStudentCount(response.data.totalTeachers)
      })
      .catch(function (response) {
        console.log("failure",response);
      });
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
   }
  render() { 
    const contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
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
                <ListItem
                    primaryText="DashBoard"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                    labelStyle={{ color: '#2196F3' }}
                    onClick={<DashBoard />}
                />
                <ListItem
                    primaryText="Course"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                    labelStyle={{ color: '#2196F3' }}
                />
                <ListItem
                    primaryText="Student"
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                />
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
      <div style={contentStyle}>
          
        <DashBoard events={this.props.data.events}/>
        <DashBoardNumberOfRole parentNo={this.props.data.parentCount} studentNo={this.props.data.studentCount} teacherNo={this.props.data.teacherCount}/>
        </div>
    </div>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
        data:state.data
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getEvents:(events)=>{
            dispatch(getEvents(events));
        },
        getParentCount:(count)=>{
            dispatch(getParentCount(count));
        },
        getTeacherCount:(count)=>{
            dispatch(getTeacherCount(count));
        },
        getStudentCount:(count)=>{
            dispatch(getStudentCount(count));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(DrawerOpenRightExample)
DrawerOpenRightExample.childContextTypes = {
            muiTheme : React.PropTypes.object.isRequired
        };