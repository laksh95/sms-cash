import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router'
export default class SideBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            course : false,
            student: false

        }
        this.course= this.course.bind(this)
        this.student=this.student.bind(this)
    }
    course(){
        console.log("inside course")
        this.setState({
            course : true,
            student:false
        })
    }
    student(){
        this.setState({
            student:true,
            course:false
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
                                onClick={()=>this.student()}
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