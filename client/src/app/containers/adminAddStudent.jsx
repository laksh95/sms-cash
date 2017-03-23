import React from 'react';
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker'

const styles = {
    customWidth: {
        width: 300,
    },
}
class AddStudent extends React.Component {
    constructor(props){
        super(props)
        let dob=new Date();
        this.state={
            value:1,
            dob
        }
    }
    handleDateChange = (event,date)=>{
        this.setState({
            dob:date
        })
    }
    handleChange=(event,index,value)=>{
        console.log('value----',value)
        this.setState({
            value:value
        })
        console.log('state-----',this.state.value)
    }
    render(){
        return(
            <div id="AddStudent">
                <div id="StudentHeader">
                    Add Student
                </div>
                <div id="addForm">
                    <div id="fieldNames">
                        <label className="extra_space">Name</label><br/>
                        <label className="extra_space">Guardian Name</label><br/>
                        <label className="extra_space">Gender</label><br/>
                        <label className="extra_space">Date of Birth</label><br/>
                    </div>
                    <div id="fieldValues">
                        <TextField hintText={'Name'} />
                        <TextField hintText={'Guardian Name'} /><br/>
                        <DropDownMenu
                            value={this.state.value}
                            onChange={this.handleChange}
                            autoWidth={false}
                            style={styles.customWidth}
                        >
                            <MenuItem primaryText={'Select Gender'} value={1}/>
                            <MenuItem primaryText={'M'} value={2} />
                            <MenuItem primaryText={'F'} value={3} />
                            <MenuItem primaryText={'Other'} value={4} />
                            <br/>
                        </DropDownMenu>
                        <DatePicker
                            hintText="Date of Birth"
                            onChange={this.handleDateChange}
                            container='inline'
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default AddStudent