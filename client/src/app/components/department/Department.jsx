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

Department.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    headerReducer: state.headerReducer
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
