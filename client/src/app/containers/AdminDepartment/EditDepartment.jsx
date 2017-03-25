import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog 
from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from "axios";
import Snackbar from 'material-ui/Snackbar';


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
        this.closeDialog= this.closeDialog.bind(this);
        this.handleNameChange= this.handleNameChange.bind(this);
        this.handleShortNameChange= this.handleShortNameChange.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

   componentDidMount() {
    let department=this.props.department;
    this.setState({nameText: department.name,
        shortNameText: department.abbreviated_name
      });
   }

    closeDialog(){
      this.props.closeEdit();
    }

    handleNameChange(event){
      let name = event.target.value;
      this.setState({nameText:name});
      name= name.trim();
      if(name==''){
        this.setState({invalidName: "Name is required"});
      }
      else if(name.length<5){
        this.setState({invalidName: "Length should be greater than 5 characters"});
      }
      else{
        this.setState({invalidName: ""});
      }
    }

    handleShortNameChange(event){
      let shortName = event.target.value;
      this.setState({shortNameText:shortName});
      shortName= shortName.trim();
      if(shortName==''){
        this.setState({invalidShortName: "Short Name is required"});
      }
      else if(shortName.length<2 || shortName.length>5){
        this.setState({invalidShortName: "Length should be between 2 to 5 characters"});
      }
      else{
        this.setState({invalidShortName: ""});
      }
    }

    handleSave(){
      if(this.state.invalidShortName=="" && this.state.invalidName==""){
        this.setState({errorMessage:""})
        let name= this.state.nameText.trim();
        let shortName= this.state.shortNameText.trim();
        let obj={
          id: this.props.department.id,
          name:name,
          abbreviated_name: shortName
        }
        axios.put('http://192.168.1.176:3166/api/department/editDepartment', obj)
        .then((response) => {
          console.log(response);
          if(response){
            let result=response.data;
            if(result.status==1){
              console.log("Successfully edited");
              this.props.updateDepartment(result.data.name, result.data.abbreviated_name);
              this.props.handleShowSnackBar("Department changes succesfully updated!");
              this.closeDialog();
            }
            else{
              this.setState({errorMessage:result.msg})   
            }
          }
          else{
            this.setState({errorMessage:"Some Error! Please try again later"})
          }

        })
      }
      else{
        this.setState({errorMessage:"Error! Please enter all the fields as suggested"})
      }
    }

    render(){
      
       const actions = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label="SAVE"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ];

        return (
           <Dialog
          title="Edit Department"
          actions={actions}
          modal={false}
          open={this.props.show}
          onRequestClose={this.closeDialog}
          >
           <div>
                <label className="errorMsg">{this.state.errorMessage}</label><br/>
                <TextField
                  hintText="Department Full Name"
                  errorText={this.state.invalidName}
                  floatingLabelText={this.props.department.name}
                  onChange={this.handleNameChange}
                  value={this.state.nameText}
                /><br />
                <TextField
                  hintText="Department Short Name"
                  floatingLabelText={this.props.department.abbreviated_name}
                  errorText={this.state.invalidShortName}
                  value={this.state.shortNameText}
                  onChange={this.handleShortNameChange}
                />
          </div>
        </Dialog>
        );
    }
}

export default EditDepartment;
