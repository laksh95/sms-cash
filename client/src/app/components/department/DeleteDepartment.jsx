import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from "axios";


class DeleteDepartment extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.showSlackBar){
        this.props.handleTouchTap({identity:"closeShowDelete"} )
      }
    }

    deleteDepartment = () => {
      let departmentId= this.props.department.id;
      this.props.deleteDepartment({id: departmentId});
    }


    render(){
       const actions = [
      <FlatButton
        label="NO"
        primary={true}
        onTouchTap={() => this.props.handleTouchTap({identity:"closeShowDelete"} )}
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
            title={"Are you sure you want to delete " + this.props.department.name + " ?"} 
            actions={actions}
            modal={false}
            open={true}
            onRequestClose={() => this.props.handleTouchTap({identity:"closeShowDelete"})}
          >
          </Dialog>
        );
    }
}

export default DeleteDepartment;
