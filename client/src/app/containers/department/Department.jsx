import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DepartmentList  from './../../components/department/DepartmentList.jsx';
import AddDepartment from './../../components/department/AddDepartment.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {getDepartmentList, addDepartment, deleteDepartment, editDepartment,
  hideSlackBar, updateSlackBarMsg, handleTabChange, pageChange, resetToNoError} from "./../../actions/departmentActions";
import {setErrorMessage} from "./../../actions/errorActions";
import {connect} from "react-redux";


class Department extends React.Component{

    constructor(props){
      super(props);
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) }
    }

    componentWillMount() {
      this.props.resetToNoError();
      let course= {courseId: 1}
      this.props.getDepartmentList(course);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.department.showErrorPage){
        this.props.setErrorMessage(this.props.department.errorMessage);
        browserHistory.push('/error');
      }
    }

    render(){
        return (
          <div >
            <Tabs value={this.props.department.selectedTab} onChange={this.props.handleTabChange}>
              <Tab label="Department List" value="list">
                  <DepartmentList
                    getDepartmentList= {(course) => this.props.getDepartmentList(course)}
                    departmentList= {this.props.department.pagedDepartment}
                    showSlackBar= {this.props.department.showSlackBar}
                    slackBarMsg= {this.props.department.queryStatusMessage}
                    hideSlackBar= {() => this.props.hideSlackBar()}
                    editDepartment= {(department) => this.props.editDepartment(department)}
                    updateSlackBarMsg= {(message) => this.props.updateSlackBarMsg(message)}
                    deleteDepartment= {(department) => this.props.deleteDepartment(department)}
                    pagination= {this.props.department.pagination}
                    pageChange= {(currentPage , size) => this.props.pageChange(currentPage , size)}
                  />
              </Tab>
              <Tab className='contentCenter' label="Add Department"value="add" >
                <AddDepartment
                  addDepartment= {(department) => this.props.addDepartment(department)}
                  showSlackBar= {this.props.department.showSlackBar}
                />
              </Tab>
            </Tabs>
          </div>
        );
    }
}

Department.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Department.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  return{
    login: state.login,
    department: state.departmentReducer,
    error: state.errorReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    getDepartmentList: (course) =>{
      dispatch(getDepartmentList(course));
    },
    addDepartment: (department) =>{
      dispatch(addDepartment(department));
    },
    deleteDepartment: (department) =>{
      dispatch(deleteDepartment(department));
    },
    editDepartment: (department) =>{
      dispatch(editDepartment(department));
    },
    hideSlackBar: () =>{
      dispatch(hideSlackBar());
    },
    updateSlackBarMsg: (message) =>{
      dispatch(updateSlackBarMsg(message));
    },
    handleTabChange: (value) =>{
      dispatch(handleTabChange(value));
    },
    pageChange: (currentPage , size) =>{
      dispatch(pageChange(currentPage , size));
    },
    resetToNoError: () =>{
      dispatch(resetToNoError());
    }   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Department);
