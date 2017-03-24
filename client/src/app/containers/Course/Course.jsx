import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import store from './../../store.jsx'
import { Router, Route, browserHistory } from 'react-router'
import AddCourse from './AddCourse.jsx'
import ViewCourse from './ViewCourse.jsx'
require('rc-pagination/assets/index.css');
const Pagination = require('rc-pagination');
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {setCourse,setPagedCourse,setSnackbarOpen,setSnackbarMessage,setValue} from './../../actions/courseAction.jsx'
import {connect} from 'react-redux'

class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            open: false,
        };
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    handleChange = (value) => {
        this.props.setValue(value)
    };
    componentWillReceiveProps(props){
        this.props = props
    }
    render(){
        console.log('course.jsx')
        const {onError,onValid, onRequestValue} = this;
        return (
            <div>
                <Tabs
                    value={this.props.courseReducer.value}
                    onChange={this.handleChange}
                >
                    <Tab label="View" value="a">
                        <ViewCourse/>
                    </Tab>
                    <Tab label="Add" value="b">
                        <AddCourse/>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}
(Course).childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
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
export  default connect(mapStateToProps,mapDispatchToProps)(Course);