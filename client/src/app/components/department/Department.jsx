import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getSelected } from '../../actions/adminActions.jsx';
import { connect } from 'react-redux';

class Department extends React.Component { 
   constructor(props) {
    super(props);
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
 
 componentWillMount() {
     this.props.getSelected(""+this.props.location.pathname);
 }

 render() {
   return(
     <div>
        <h3>Department</h3> 
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

const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getSelected: (location) => {
        dispatch(getSelected(location))
      }
     
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Department);

