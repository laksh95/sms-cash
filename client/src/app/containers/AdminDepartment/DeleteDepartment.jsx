import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from "axios";


class DeleteDepartment extends React.Component{

    constructor(props){
        super(props);
        this.state={
        };
        this.closeDialog= this.closeDialog.bind(this);
        this.deleteDepartment= this.deleteDepartment.bind(this);
    }

    closeDialog(){
      this.props.closeDelete();
    }

    deleteDepartment(){
      let departmentId= this.props.department.id;
      console.log("In delete Depar");
      axios.put('http://192.168.1.176:3166/api/department/deleteDepartment', {id:departmentId})
        .then((response) => {
          console.log("response: ", response);
          if(response){
            let result=response.data;
            if(result.status==1){
              console.log("Successfully Deleted");
              this.props.removeDepartment();
              this.props.handleShowSnackBar("Department succesfully deleted!");
              this.closeDialog();
            }
            else{
              console.log("In first else")
              this.props.handleShowSnackBar(result.msg);
              this.closeDialog();
            }
          }
          else{
            console.log("In 2nd else")
            this.props.handleShowSnackBar("Some problem! Please try again later");
            this.closeDialog();
          }

        })
        .catch((error)=> {
          console.log("In catch ", error);
        })
    }


    render(){
       const actions = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
        label="YES"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.deleteDepartment}
      />,
    ];

        return (
           <Dialog
          title={"Are you sure you want to delete " + this.props.department.name+ " ?"} 
          actions={actions}
          modal={false}
          open={this.props.show}
          onRequestClose={this.closeDialog}
          >
        </Dialog>
        );
    }
}

export default DeleteDepartment;
