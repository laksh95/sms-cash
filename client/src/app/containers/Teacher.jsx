import React from 'react'
import ReactDOM from 'react-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import axios from 'axios'
import AllTeacher from './AllTeacher.jsx'
import AddTeacher from './AddTeacher.jsx'
import ApproverDetails from './ApproverDetails.jsx'
import renderIf from 'render-if'

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

    allTeacher(){
    this.setState({
      allTeacher : true,
      addTeacher : false,
      approveDetails : false
    })
    console.log(this.state)
    }

    addTeacher(){
    this.setState({
      allTeacher : false,
      addTeacher : true,
      approveDetails : false
    })
    console.log(this.state)
    }

    approveDetails(){
    this.setState({
      allTeacher : false,
      addTeacher : false,
      approveDetails : true
    })
    console.log(this.state)
    }

    render(){
      const contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
      const tabStyle = { marginTop:10, marginLeft: 0, marginRight: 30 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' }
      return(
        <div>
          <Tabs style={tabStyle}>
            <Tab label="Show Teacher" onActive={this.allTeacher}>
            </Tab>
            <Tab label="Add Teachers" onActive={()=>this.addTeacher()}>
            </Tab>
            <Tab label="Approve Details" onActive={()=>this.approveDetails()}>
            </Tab>
          </Tabs>

          <div style={tabStyle}>
            {
              renderIf(this.state.allTeacher)
              (
               <AllTeacher/>
              )
            }
            {
              renderIf(this.state.addTeacher)
              (
               <AddTeacher/>
              )
            }
            {
              renderIf(this.state.approveDetails)
              (
                <ApproverDetails/>
              )
            }
          </div>
        </div>
      )
    }
}
export default Teacher
