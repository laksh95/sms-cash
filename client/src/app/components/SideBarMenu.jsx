import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Button } from 'react-bootstrap';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import DashBoard from './../components/DashBoard.jsx';
import DashBoardNumberOfRole from './../components/DashBoardNumberOfRole.jsx';
import {store} from "../store.js";
import {connect} from "react-redux";
import {getParentCount,getStudentCount,getTeacherCount,getEvents} from '../actions/getDataAction.jsx';
import renderIf from 'render-if';
let SelectableList = makeSelectable(List);
class DrawerOpenRightExample extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        dashboard : true,
        openSnack: false,
        message:'',

    }
  }
  dashboard=()=>{
    console.log("inside dashboard")
    this.setState({
        dashboard : true
    })
  }
  handleSnackRequestClose=(event)=>{
    this.setState({
          openSnack: false,
          message:''
    });
  }
  componentWillMount(){
      axios.post('http://localhost:1234/api/academicCalendar/dashboard/getInitialData',{
        userId:'1'
      })
      .then((response)=> {
        console.log("success",response);
        let invalid=0;
        let messg='';
        let events=this.props.data.events;
          if(response.data.totalEvent.status==1){
            for(let i in response.data.totalEvent)
            {
              let event1={
                id:response.data.totalEvent[i].content,
                start:new Date(response.data.totalEvent[i].start_date),
                end:new Date(response.data.totalEvent[i].start_date),
                content:response.data.totalEvent[i].content,
                type:response.data.totalEvent[i].type,
                title:response.data.totalEvent[i].content,
                calendarType:'academic'
              }
              events.push(event1)
            }
            this.props.getEvents(events)
          }
          else {
            invalid++;
            messg= "random"
          }
          if(response.data.personalCalendar.status==1){
            for(let i in response.data.personalCalendar.data){
              let event1={
                id:response.data.personalCalendar[i].content,
                start:new Date(response.data.personalCalendar[i].start_date),
                end:new Date(response.data.personalCalendar[i].start_date),
                content:response.personalCalendar[i].content,
                type:response.data.personalCalendar[i].heading,
                title:response.data.personalCalendar[i].heading,
                calendarType:'personal'
              }
              events.push(event1)
          }
          this.props.getEvents(events)
        }
        else invalid++;
        if(response.data.totalStudents.status==1){
          this.props.getTeacherCount(response.data.totalStudents.data)
        }
        else invalid++;
        if(response.data.totalStudents.status==1){
          this.props.getParentCount(response.data.totalParent.data)
        }
        else invalid++;
        if(response.data.totalStudents.status==1){
          this.props.getStudentCount(response.data.totalTeachers.data)
        }
        else invalid++;
        this.setState({
          openSnack:true,
          message: "balh"
        })
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
           <SelectableList defaultValue={1}>
            <ListItem
              value={1}
              primaryText="DashBoard"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
              onClick={()=>this.dashboard()}
            />
            <ListItem
              value={2}
              primaryText="Course"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
            <ListItem
              value={3}
              primaryText="Student"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
            <ListItem
              value={4}
              primaryText="Teacher"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
            <ListItem
              value={5}
              primaryText="Subjects"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
            <ListItem
              value={6}
              primaryText="Events"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
          </SelectableList>
          <Divider />
          <SelectableList defaultValue={7}>
            <ListItem
              value={7}
              primaryText="Important"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
            <ListItem
              value={8}
              primaryText="Teachers/Students"
              leftAvatar={<Avatar src={require('./../images/user.png')} />}
            />
          </SelectableList>
        </Drawer>
      <div style={contentStyle}>
      {
          renderIf(this.state.dashboard)
              (
                  <div>
                    <DashBoard />
                    <DashBoardNumberOfRole parentNo={this.props.data.parentCount} studentNo={this.props.data.studentCount} teacherNo={this.props.data.teacherCount}/>
                  </div>
              )

        }
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
