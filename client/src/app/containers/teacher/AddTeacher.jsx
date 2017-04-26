import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import { addUser } from '../../actions/teacherActions'
import { connect } from 'react-redux'

class AddTeacher extends React.Component{
    constructor(props) {
    	super(props);
      this.state = {
          allDepartments: [{
            name: "CSE"
          },
          {
            name: "MECH"
          }],
          departmentSelected: null,
          teacherName: null,
          joinDate: "",
          designation: null,
          email: null
      }
    }
    handleChange = (type, event) => {
      switch (type) {
        case "addUser":
          let details = {
            name: this.state.teacherName,
            department: this.state.departmentSelected,
            email: this.state.email,
            joinDate: this.state.joinDate,
            designation: this.state.designation
          }
          this.props.addUser(details)
          break
        case "getName":
          this.setState({
            teacherName: event.target.value
          })
          break
        case "getDesignation" :
          this.setState({
            designation: event.target.value
          })
          break
        case "getEmail" :
          this.setState({
            email: event.target.value
          })
          break
        default:
          break
      }
    }
    getDate = (event, date) => {
      this.setState({
        joinDate: date
      })
    }

    hadleChangeDepartment = (event, index, value) => {
      this.setState({
        departmentSelected: value
      })
    }

    componentWillGetProps(nextProps){
      this.props = nextProps
    }

    render(){
      const style = {
        margin: 12
      }
      const formStyle = {
        marginLeft: "40%"
      }
      const divStyle = {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#DCDCDC"
      }
    	return(
        <div style={divStyle}>
    		<div style={formStyle}>
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.hadleChangeDepartment }
          >
          {
            this.state.allDepartments.map((data,index)=>{
              return(
                  <MenuItem value={data.name} primaryText={data.name}/>
              )
            })
          }
          </SelectField>
          <br />
          <form>
              <TextField
              floatingLabelText="Teacher name"
              onChange={ this.handleChange.bind(this, "getName") }
              />
              <br />
              <TextField
              floatingLabelText="Teacher designation"
              onChange={this.handleChange.bind(this, "getDesignation")}
              />
              <br />
              <TextField
              floatingLabelText="Teacher Email ID"
              onChange={this.handleChange.bind(this, "getEmail")}
              />
              <br /><br />
              <DatePicker hintText="Join Date" mode="landscape" onChange={ this.getDate }/>
              <RaisedButton  label="ADD" primary={true} style={style} onTouchTap= {this.handleChange.bind(this,"addUser")}/>
          </form>
    		</div>
      </div>
    	)
    }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacherReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (details) => {
      dispatch(addUser(details))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacher);
