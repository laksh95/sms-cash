import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import axios from 'axios'
import AllTeacher from './AllTeacher.jsx'
import AddTeacher from './AddTeacher.jsx'
import renderIf from 'render-if'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class Teacher extends React.Component{
    constructor(props) {
      super(props);
      this.props = props

      this.state={
        allTeacher : false,
        addTeacher : false,
        approveDetails : false
      }
      this.allTeacher = this.allTeacher.bind(this)
      this.addTeacher = this.addTeacher.bind(this)
      this.approveDetails = this.approveDetails.bind(this)
    }

    getChildContext() {
       return { muiTheme: getMuiTheme(baseTheme) };
    }
    allTeacher(){
      this.setState({
        allTeacher : true,
        addTeacher : false,
        approveDetails : false
      })
    }

    addTeacher(){
      this.setState({
        allTeacher : false,
        addTeacher : true,
        approveDetails : false
      })
    }

    approveDetails(){
      this.setState({
        allTeacher : false,
        addTeacher : false,
        approveDetails : true
      })
    }

    componentWillUnmount() {
      this.props.getTeacher
    }

    componentWillGetProps(nextProps){
      this.props = nextProps
    }
    render(){
      const contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
      const tabStyle = { marginTop:10, marginLeft: 250, marginRight: 20 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' }
      return(
        <div>
          <Tabs style={tabStyle}>
            <Tab label="Show Teacher" onActive={this.allTeacher}>
            </Tab>
            <Tab label="Add Teachers" onActive={()=>this.addTeacher()}>
            </Tab>
          </Tabs>

          <div style={tabStyle}>
              <Link to = '/teacher/allTeacher'>
                <AllTeacher/>
              </Link>
              <Link to = '/teacher/addTeacher'>
                <AddTeacher/>
              </Link>
          </div>
        </div>
      )
    }
}

(Teacher).childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};
export default Teacher
