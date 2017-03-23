import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import NumberInput from 'material-ui-number-input';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle =  this.handleToggle.bind(this);
        this.state = {
            open: true
        };
        this.onError1 = (error) => {
            let errorText;
            console.log(error);
            switch (error) {
                case 'required':
                    errorText = 'This field is required';
                    break;
                case 'invalidSymbol':
                    errorText = 'You are trying to enter none number symbol';
                    break;
                case 'incompleteNumber':
                    errorText = 'Number is incomplete';
                    break;
                case 'singleMinus':
                    errorText = 'Minus can be use only for negativity';
                    break;
                case 'singleFloatingPoint':
                    errorText = 'There is already a floating point';
                    break;
                case 'singleZero':
                    errorText = 'Floating point is expected';
                    break;
                case 'min':
                    errorText = 'You are trying to enter number less than -10';
                    break;
                case 'max':
                    errorText = 'You are trying to enter number greater than 12';
                    break;
            }
            this.setState({ errorText4: errorText });
        };
    }
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    render(){
        const {state, onChange, onError1, onKeyDown, onValid, onRequestValue} = this;
        const contentStyle = {
            marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
        };

        if (this.state.open) {
            contentStyle.marginLeft = 230;
        }
        return (
            <div>
                <h2 className="headline">Add a course</h2>
                <TextField
                    hintText="Course Name"
                    onChange={this.addCourseName}
                    errorText={this.state.errorText3}
                /><br />
                <NumberInput
                    id="num1"
                    hintText="Duration"
                    required
                    strategy="warn"
                    errorText={this.state.errorText4}
                    onValid={onValid}
                    onChange={this.addCourseDuration}
                    onError={onError1}
                    onRequestValue={onRequestValue} />
                <br />
                <RaisedButton label="Submit"
                              onClick={()=>this.addCourse()}
                              primary={true}
                              className="style"
                              disabled = {!(this.state.validateNewCourseName && this.state.validateNewCourseDuration)}
                />
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.snackbarHandleRequestClose}
                />
            </div>
        );
    }
}










