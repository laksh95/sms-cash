import React from 'react';
import DrawerOpenRightExample from './SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 
let a = require('./../css/style.css');
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import store from './../store.jsx'
import { Router, Route, browserHistory } from 'react-router'
import {setCourse,setSnackbarMessage,setSnackbarOpen,setPagedCourse,setValue} from './../actions/courseAction.jsx'
import {connect} from 'react-redux'
class App extends React.Component{
   constructor(props) {
   super(props);
   this.handleToggle =  this.handleToggle.bind(this);
   this.state = {
        open: true
       };
   }
   handleToggle(){
       this.setState({open: !this.state.open});
   }
  render(){
       console.log("app.jsx")
    const contentStyle = {
        marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
    };

    if (this.state.open) {
      contentStyle.marginLeft = 230;
    }
    return (
      <div className="mymain">
        <div style={contentStyle}>
         <TopBar handleToggle = {this.handleToggle} open = {this.state.open}/>
        </div>
       <DrawerOpenRightExample handleToggle = {this.handleToggle} open = {this.state.open} />
      </div>
    );
  }
}
const history = syncHistoryWithStore(browserHistory, store)

const mapStateToProps = (state) => {
    return {
        courseReducer: state.courseReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCourse : (course)=>{
            dispatch(setCourse(course))
        },
        setPagedCourse : (course)=>{
            dispatch(setPagedCourse(course))
        },
        setSnackbarOpen :(data)=>{
            dispatch(setSnackbarOpen(data))
        },
        setSnackbarMessage:(data)=>{
            dispatch(setSnackbarMessage(data))
        },
        setValue:(value)=>{
            dispatch(setValue(value))
        }
    };
};
export  default connect(mapStateToProps,mapDispatchToProps)(App);