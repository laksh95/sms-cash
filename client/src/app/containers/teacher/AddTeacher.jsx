import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import { addUser } from '../../actions/teacherAction.jsx'
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
          designation: ""
      }
    }
    handleChange = (event , type, data) => {
      switch (type) {
        case 'addUser': () => {
          let details = {
            name: this.state.teacherName,
            department: this.state.departmentSelected,
            email: this.state.email,
            joinDate: this.state.joinDate,
            designation: this.state.designation
          }
          this.props.addUser(details)
        }
        break
        case 'hadleChangeDepartment': (event, data.index, data.value) => {
          this.setState({
            departmentSelected: value
          })
        }
        break
        case 'getName': (event) => {
          this.setState({
            teacherName: event.target.values
          })
        }
        break
        case 'getDesignation' : (event) => {
          this.setState({
            designation: event.target.value
          })
        }
      }
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
          onChange={ (event ,hadleChangeDepartment, null) => this.handleChange }
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
          value={this.state.teacherName}
          onChange={this.getName}
          />
          <br />
          <TextField
          floatingLabelText="Teacher designation"
          />
          <br />
          <TextField
          floatingLabelText="Teacher Email ID"
          />
          <br /><br />
          <DatePicker hintText="Join Date"/>
          <RaisedButton label="ADD" primary={true} style={style} onTouchTap= {this.addUser}/>
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
