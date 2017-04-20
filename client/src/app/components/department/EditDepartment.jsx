import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {isEmpty, isLengthInvalid} from './../../utils/validation.js'


class EditDepartment extends React.Component{

    constructor(props){
        super(props);
        this.state={
	        invalidName:"",
	        invalidShortName:"",
	        nameText:"",
	        shortNameText: "",
	        errorMessage: ""
        };
    }

    componentDidMount() {
    	let department=this.props.department;
    	this.setState({
    		nameText: department.name,
        shortNameText: department.abbreviated_name
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.showSlackBar){
        this.props.handleTouchTap({identity:"closeShowEdit"} )
      }
    }

    handleTextChange= (event, item) => {
      let message= "";
    	switch(item){
    		case "name": 
    			let name= event.target.value;
    			this.setState({nameText:name});
    			name= name.trim();
    			if(isEmpty(name)){
    				message= "Name is required"; 
    			}
			    else if(isLengthInvalid(name, 5, 75)) {
			    	message= "Length should be greater than 5 characters";
			    }
			    else {
			    	message= ""; 
				  }	
			this.setState({invalidName: message});
    	break;

    		case "shortName": 
    			let shortName= event.target.value;
    			this.setState({shortNameText:shortName});
    			shortName= shortName.trim();
      		if(isEmpty(shortName))
        		message= "Short Name is required";
			    else if(isLengthInvalid(shortName, 2, 5))
			    	message= "Length should be between 2 to 5 characters";
			    else
			     message= "";
			    this.setState({invalidShortName: message});
    		break;    		
    	}
    }

    handleSave= () => {
    	if(this.state.invalidShortName=="" && this.state.invalidName==""){
        this.setState({errorMessage:""})
        let name= this.state.nameText.trim();
        let shortName= this.state.shortNameText.trim();
        let departmentObj={
	        id: this.props.department.id,
	        name:name,
	        abbreviated_name: shortName,
          course_id: 1
        }
        this.props.editDepartment(departmentObj);
      }
      else{
        this.setState({errorMessage:"Error! Please enter all the fields as suggested: "});
      }
    }

    render(){
      
       const actions = [
	      	<FlatButton
		    	label="CANCEL"
		        primary={true}
		        onTouchTap={() => this.props.handleTouchTap({identity:"closeShowEdit"} )}
		    />,
	      	<FlatButton
		        label="SAVE"
		        primary={true}
		        keyboardFocused={true}
            onTouchTap= {this.handleSave}
	      	/>,
        ];

        return (
            <Dialog
		        title="Edit Department"
		        actions={actions}
		        modal={false}
		        open={true}
		        onRequestClose={()=> this.props.handleTouchTap({identity:"closeShowEdit"})}
            >
            <div>
                <label className="errorMsg">{this.state.errorMessage}</label><br/>
                <TextField
                  hintText="Department Full Name"
                  errorText={this.state.invalidName}
                  floatingLabelText={this.props.department.name}
                  onChange={(e)=> this.handleTextChange(e, "name")}
                  value={this.state.nameText}
                /><br />
                <TextField
                  hintText="Department Short Name"
                  floatingLabelText={this.props.department.abbreviated_name}
                  errorText={this.state.invalidShortName}
                  value={this.state.shortNameText}
                  onChange={(e)=> this.handleTextChange(e,"shortName")}
                />
            </div>
        	</Dialog>
        );
    }
}

export default EditDepartment;