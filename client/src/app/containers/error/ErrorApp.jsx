import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import TopBar from './../../components/login/TopBar.jsx'; 
import {setErrorMessage} from "./../../actions/errorActions";
import {connect} from "react-redux";

class ErrorApp extends React.Component {

	constructor(props){
        super(props);
        this.state = {  
        };
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }

    render(){
        return (
          <div >
            <TopBar /> 
            <h1>Error</h1>
            <label>{this.props.error.errorMessage}</label>
          </div>
        );
    }
}

ErrorApp.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
ErrorApp.contextTypes = { 
    router: React.PropTypes.object.isRequired
};

const mapStateToProps= (state) => {
  return{
    error: state.errorReducer
  };
};


const mapDispatchToProps= (dispatch) => {
  return{
    setErrorMessage: (message) =>{
      dispatch(setErrorMessage(message));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErrorApp);