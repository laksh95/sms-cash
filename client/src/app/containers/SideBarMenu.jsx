import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import {List, ListItem,makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Course  from './Course/Course.jsx'
let SelectableList = makeSelectable(List);
export default class DrawerOpenRightExample extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        course : false
    }
    this.course= this.course.bind(this)
  }
  course(){
    this.setState({
        course : true
    })
  }
  componentWillReceiveProps(props){
      this.props = props
  }
  componentWillMount(){

  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
   }

  onClick = (event, menuItem, index) => {
   $('#menuItem' + this.state.currentSelection).attr('class', '');
   $('#menuItem' + index).attr('class', 'activeNavItem');
   this.setState({currentSelection: index});
 }
  render() {
    const bool = this.state.cours
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
         <Drawer width={sizeWidth} openSecondary={false} docked={true} zDepth={2} open={true}>
          <AppBar title="Menu"
           onLeftIconButtonTouchTap = {this.props.handleToggle} />
            <List>
                <ListItem
                    primaryText="Course"
                    onClick={()=>this.course()}
                    leftAvatar={<Avatar src={require('./../images/user.png')} />}
                    labelStyle={{ color: '#2196F3' }}
                />
                <ListItem
                    primaryText="DashBoard "
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
          {
             <Course/>
          }
      </div>
    </div>
    );
  }
}
DrawerOpenRightExample.childContextTypes = {
            muiTheme : React.PropTypes.object.isRequired
        };