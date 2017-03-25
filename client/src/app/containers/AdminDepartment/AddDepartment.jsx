import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddDepartment extends React.Component{

    constructor(props){
      super(props);
      this.state={
        name:"",
        shortName: "",
        invalidName:"",
        invalidShortName:"",
        errorMessage:""
      };
    }

    handleNameChange=(event)=>{
      let name = event.target.value;
      this.setState({name:name});
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

    handleShortNameChange=(event)=>{
      let shortName = event.target.value;
      this.setState({shortName:shortName});
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

    addDepartment= ()=> {
       if(this.state.invalidShortName=="" && this.state.invalidName==""){
        this.setState({errorMessage:""})
        let name= this.state.name.trim();
        let shortName= this.state.shortName.trim();
        let obj={
          name:name,
          abbreviated_name: shortName,
          course_id: 1
        }
        axios.post('http://192.168.1.176:3166/api/department/addDepartment', obj)
        .then((response) => {
          console.log(response);
          if(response){
            let result=response.data;
            if(result.status==1){
              console.log("Successfully Added!");
              //this.props.updateDepartment(result.data.name, result.data.abbreviated_name);
              //this.props.handleShowSnackBar("Department succesfully Added!");
              //this.closeDialog();
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
        return (
          <div>
           <div className="contentCenter">
              <h2>Add Department</h2><br/>
              <label className="errorMsg">{this.state.errorMessage}</label><br/>
              <TextField
                hintText="Department Full Name"
                errorText={this.state.invalidName}
                floatingLabelText="Full Name"
                onChange={this.handleNameChange}
                value={this.state.name}
              /><br />
              <TextField
                hintText="Department Short Name"
                errorText={this.state.invalidShortName}
                floatingLabelText="Short Name"
                onChange={this.handleShortNameChange}
                value={this.state.shortName}
              />
              <br /><br/><br/>
              <RaisedButton label="ADD" primary={true}/>
              <br/><br/>
              <Divider />
          </div>
          <p>@2017 Rookies cronj.com|version 1.0</p>
        </div>
        );
    }
}

export default AddDepartment;
