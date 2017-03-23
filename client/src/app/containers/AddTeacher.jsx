import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem';

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
          teacherName: null
      }
    }

    handleChangeDepartment = (event, index, value) => {
      this.setState({
        departmentSelected: value
      })
    }

    getName = (event) => {
      this.setState({
        teacherName: event.target.value
      })
    }

    render(){
      const style = {
        margin: 12
      }
      const styleSelectField = {
        marginTop: 50
      }

    	return(
    		<div>
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.handleChangeDepartment}
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
          <TextField
          floatingLabelText="Teacher name"
          value={this.state.teacherName}
          onChange={this.getName}
          />
          &nbsp;&nbsp;&nbsp;
          <TextField
          floatingLabelText="Teacher designation"
          />
          &nbsp;&nbsp;&nbsp;
          <RaisedButton label="ADD" primary={true} style={style} />
    		</div>
    	)
    }
}
export default AddTeacher
