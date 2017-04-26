import React from 'react';
import AppBar from 'material-ui/AppBar';
import { getSelected } from '../../actions/adminActions.js';
import { connect } from 'react-redux';

class Teacher extends React.Component {
   constructor(props) {
    super(props);
  }


 componentWillMount() {
     this.props.getSelected(""+this.props.location.pathname);
 }

 render() {
   return(
     <div>
        <h3>Teacher</h3>
     </div>
    );
  }
}

Teacher.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
