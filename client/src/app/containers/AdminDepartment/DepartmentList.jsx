import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import EditDepartment  from './EditDepartment.jsx';
import DeleteDepartment  from './DeleteDepartment.jsx';
import axios from "axios";
import Snackbar from 'material-ui/Snackbar';


class DepartmentList extends React.Component{

    constructor(props){
        super(props);
        this.state={
          edit: false,
          editFlag: false,
          showDelete: false,
          showSnackBar: false,
          openSnackBar: false,
          snackBarMsg: "",
          list: [{ name: "Electricals",
                  abbreviated_name:"EEE",
                  total_no_of_students:10},
                  { name: "Computer Science",
                  abbreviated_name:"CSE",
                  total_no_of_students:10},
                ],
          selectedDepartment: {},
          selectedIndex: ""
        };
      this.handleEdit= this.handleEdit.bind(this);
      this.handleEditClose= this.handleEditClose.bind(this);
      this.changeFlag= this.changeFlag.bind(this);
      this.updateDepartment= this.updateDepartment.bind(this);
      this.handleShowSnackBar= this.handleShowSnackBar.bind(this);
      this.handleRequestClose= this.handleRequestClose.bind(this);
      this.removeDepartment= this.removeDepartment.bind(this);
    }

    componentWillMount() {
      console.log("In will mount");
      axios.post('http://192.168.1.176:3166/api/department/getDepartments', {course_id: 1})
      .then((response) => {
        console.log(response);
        if(response){
            let result=response.data;
            if(result){
              this.setState({list: result});
            } 
          }
      })
    }



    handleEdit = (selectedDepartment, selectedIndex) => {
      this.setState({selectedDepartment: selectedDepartment, edit: true, editFlag: true, selectedIndex:selectedIndex});
    }

    handleEditClose = () => {
      this.setState({edit: false, editFlag: false});
    }
    
    handleDelete = (selectedDepartment, selectedIndex) => {
      this.setState({selectedDepartment: selectedDepartment, showDelete: true, selectedIndex: selectedIndex});
    }

    handleDeleteClose = () => {
      this.setState({showDelete: false});
    }

    changeFlag(){
      this.setState({firstFlag:false});
    }

    updateDepartment(name, shortName){
      let departmentList= this.state.list;
      let index=  this.state.selectedIndex;
      departmentList[index].name=name;
      departmentList[index].abbreviated_name=shortName;
      this.setState({list: departmentList});
    }

    handleShowSnackBar(msg){
      this.setState({showSnackBar: true, openSnackBar:true, snackBarMsg:msg})
    }

    handleRequestClose(){
      this.setState({openSnackBar: false, showSnackBar:false, snackBarMsg:""})
    }

    removeDepartment(){
      let departmentList= this.state.list;
      let index= this.state.selectedIndex;
      departmentList.splice(index,1);
      this.setState({list:departmentList});
    }


    render(){

      const edit=
      <EditDepartment show={this.state.edit} 
        closeEdit={this.handleEditClose} 
        department={this.state.selectedDepartment}
        updateDepartment={this.updateDepartment}
        handleShowSnackBar={this.handleShowSnackBar}
      />;

      const snackBar=
        <Snackbar
            open={this.state.openSnackBar}
            message= {this.state.snackBarMsg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
        />

        return (
          <div>
            <Table >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Department Name</TableHeaderColumn>
                  <TableHeaderColumn>Short Name</TableHeaderColumn>
                  <TableHeaderColumn>No. of Students</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.list.map((department, index) =>
                  <TableRow key ={index}>
                    <TableRowColumn>{department.name}</TableRowColumn>
                    <TableRowColumn>{department.abbreviated_name}</TableRowColumn>
                    <TableRowColumn>{department.total_no_of_students}</TableRowColumn>
                    <TableRowColumn>
                      <FlatButton label="EDIT" primary={true} onTouchTap={()=> this.handleEdit(department, index)}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <FlatButton label="DELETE" secondary={true} onTouchTap={()=> this.handleDelete(department, index)}/>
                    </TableRowColumn>
                  </TableRow>)}
              </TableBody>
            </Table>

            {this.state.editFlag? edit: null} 

            <DeleteDepartment 
              show={this.state.showDelete} 
              closeDelete={this.handleDeleteClose} 
              department={this.state.selectedDepartment} 
              removeDepartment={this.removeDepartment}
              handleShowSnackBar={this.handleShowSnackBar}
            />

            {this.state.showSnackBar? snackBar: null} 
          </div>
        );
    }
}

export default DepartmentList;
