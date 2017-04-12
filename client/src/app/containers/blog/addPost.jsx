import React from 'react';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {openModal} from "./../../actions/blogActions.jsx";
import Auth from './../../Auth.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import TextField from 'material-ui/TextField';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
var Dropzone = require('react-dropzone');


let loginStyle = require('./../../css/login.css');
class AddPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }

    }
    componentWillReceiveProps(props){
        this.props= props
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidUpdate(prevProps, prevState) {

    }
    handleOpen = () => {
        this.props.openModal(true)
    };

    handleClose = () => {
        this.props.openModal(false)
    };
    handleChange(value) {
        this.setState({ text: value })
    }
    onDrop(files) {
        console.log('Received files: ', files);
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Post"
                primary={true}
                disabled={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Add your own Post"
                    actions={actions}
                    modal={true}
                    open={this.props.blogReducer.open}
                >
                    <TextField
                        hintText="Post Heading"
                        floatingLabelText="Post Heading"
                        fullWidth={true}
                    /><br /><br/>
                    <div>
                        <Dropzone
                            onDrop={this.onDrop}
                            multiple={false}
                        >
                            <div>Upload Image</div>
                        </Dropzone>
                    </div>
                    <TextField
                        hintText="Post Content"
                        floatingLabelText="Post Content"
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                    /><br /><br/>

                </Dialog>
            </div>
        );
    }
}
AddPost.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
AddPost.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps= (state) => {
    return{
        login: state.login,
        blogReducer : state.blogReducer
    };
};
const mapDispatchToProps= (dispatch) => {
    return{
        loginUser: (credential) =>{
            dispatch(loginUser(credential));
        },
        checkLogin: () =>{
            dispatch(checkLogin());
        },
        openModal :(data) =>{
            dispatch(openModal(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddPost);

