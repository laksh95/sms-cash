import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getSelected } from '../../actions/adminActions.jsx';
import { connect } from 'react-redux';


class DashBoard extends React.Component {
   constructor(props) {
    super(props);
    }

   getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }

   componentWillReceiveProps(nextProps) {
      this.props = nextProps;
    }

    componentWillMount() {
     this.props.getSelected(""+this.props.location.pathname);
    }


   render(){
     return(
         <div>
           <div>DashBoard</div>
         </div>
         );
    }
}

DashBoard.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
DashBoard.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
