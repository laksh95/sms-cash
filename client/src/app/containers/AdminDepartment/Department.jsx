import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DepartmentList  from './DepartmentList.jsx';
import AddDepartment from './AddDepartment.jsx';

class Department extends React.Component{

    constructor(props){
        super(props);
        this.state={
        };

    this.handleActive= this.handleActive.bind(this);
    }

    handleActive(tab) {
        alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    }

    render(){
        return (
            <div >
                <Divider />
                    <h1> Manage Department </h1>
                <Divider />
                <Tabs>
                  <Tab label="Department List" >
                      <DepartmentList/>
                  </Tab>
                  <Tab className='contentCenter' label="Add Department" >
                    <AddDepartment/>
                  </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Department;
