import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'
import AddCourse from './AddCourse.jsx'
import ViewCourse from './ViewCourse.jsx'
require('rc-pagination/assets/index.css');
const Pagination = require('rc-pagination');
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
            open: false,
        };
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }


    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    componentWillReceiveProps(props){
        this.props = props
    }
    render(){
        const {onError,onValid, onRequestValue} = this;
        return (
            <div>
                <Tabs
                    value={this.state.value}
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
export default Course