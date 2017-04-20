import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {isEmpty, isLengthInvalid} from './../../utils/validation.js'
//import RefreshIndicator from 'material-ui/RefreshIndicator';

class AddDepartment extends React.Component{

    constructor(props){
      super(props);
      this.state={
        name:"",
        shortName: "",
        invalidName:"Name is required",
        invalidShortName:"Short Name is required",
        errorMessage:""
      };
    }

    //validate department short and full name
     handleTextChange= (event, item) => {
      let message= "";
      switch(item){
        case "name": 
          let name= event.target.value;
          this.setState({name:name});
          name= name.trim();
          if(isEmpty(name))
            message= "Name is required"; 
          else if(isLengthInvalid(name, 5, 75))
            message= "Length should be greater than 5 characters";
          else 
            message= ""; 
        this.setState({invalidName: message});
        break;

        case "shortName": 
          let shortName= event.target.value;
          this.setState({shortName:shortName});
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

    addDepartment= ()=> {
      if(this.state.invalidShortName=="" && this.state.invalidName==""){
        this.setState({errorMessage:""})
        let name= this.state.name.trim();
        let shortName= this.state.shortName.trim();
        let departmentObj={
          name:name,
          abbreviated_name: shortName,
          course_id: 1
        }
        this.props.addDepartment(departmentObj); 
      }
      else{
        this.setState({errorMessage:"Error! Please enter all the fields as suggested"})
      }
    }

    render(){
      {
      // const loaderStyle = {
      //   container: {
      //     position: 'relative',
      //   },
      //   refresh: {
      //     display: 'inline-block',
      //     position: 'relative',
      //   },
      // };
    }

        return (
          <div>
           <div className="contentCenter">
              <h2>Add Department</h2><br/>
              <label className="errorMsg">{this.state.errorMessage}</label><br/>
              <TextField
                hintText="Department Full Name"
                errorText={this.state.invalidName}
                floatingLabelText="Full Name"
                onChange={(e)=> this.handleTextChange(e, "name")}
                value={this.state.name}
              /><br />
              <TextField
                hintText="Department Short Name"
                errorText={this.state.invalidShortName}
                floatingLabelText="Short Name"
                onChange={(e)=> this.handleTextChange(e, "shortName")}
                value={this.state.shortName}
              />
              <br /><br/><br/>
              <RaisedButton label="ADD" primary={true} onTouchTap= {this.addDepartment}/>
               {//<RefreshIndicator
              //   size={40}
              //   left={10}
              //   top={0}
              //   status="loading"
              //   style={loaderStyle.refresh}
              // />
            }
              <br/><br/>
              <Divider />
          </div>
          <p>@2017 Rookies cronj.com|version 1.0</p>
        </div>
        );
    }
}

export default AddDepartment;
