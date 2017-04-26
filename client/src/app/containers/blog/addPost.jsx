import React from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions.jsx";
import {openModal,addPost} from "./../../actions/blogActions.jsx";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
let Dropzone = require('react-dropzone');
import {Component, PropTypes} from 'react';

import RichTextEditor from 'react-rte';

let loginStyle = require('./../../css/login.css');
class AddPost extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
                text: '',
                validateHeading : false ,
                open : false,
                validateContent : false,
                heading : "" ,
                content : "",
                image : "",
                value: RichTextEditor.createEmptyValue(),
                message : ""

        }
        this.onDrop= this.onDrop.bind(this)
        this.setContent= this.setContent.bind(this)
    }
    static propTypes = {
        onChange: PropTypes.func
    };
    componentWillReceiveProps(props){
        this.props= props
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleOpen = () => {
        this.props.openModal(true)
    };
    handleClose = (event,type) => {
        console.log(event)
        switch(event){
            case "CANCEL":
                this.props.openModal(false)
                this.setState({image : {}})
                break
            case "POST":
                var image =this.state.image
                var data = {
                    heading : this.state.heading,
                    content : this.state.value
                }
                this.props.addPost(data)
                this.props.openModal(true)
                this.setState({open : true, message : "Post Added" })
                break
            default:
                break
        }

    };
    onDrop(files){
        console.log(files)
        this.setState({
            image : files[0]
        },()=>{
            console.log("this.state.image",this.state.image)
        })
    }
    handleChange = (type, event) => {
        switch(type){
            case "HEADING":
                    this.setState({
                    heading : event.target.value
                })
                if(event.target.value.trim()==''){
                    this.setState({
                        validateHeading : false
                    })
                }
                else {
                    this.setState({
                        validateHeading : true
                    })
                }
                break
        }
    }
    setContent(value){
        this.setState({
            value  :value
        })
        if(value.toString('html') == "<p><br></p>"){
            this.setState({
                validateContent : false
            })
        }
        else {
            this.setState({
                validateContent : true
            })
        }
    }
    render(){
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                {label: 'Italic', style: 'ITALIC'},
                {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_DROPDOWN: [
                {label: 'Normal', style: 'unstyled'},
                {label: 'Heading Large', style: 'header-one'},
                {label: 'Heading Medium', style: 'header-two'},
                {label: 'Heading Small', style: 'header-three'}
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };
        console.log("this.state",this.state)
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL")}
            />,
            <FlatButton
                label="Post"
                primary={true}
                disabled={!(this.state.validateContent&&this.state.validateHeading)}
                onTouchTap={this.handleClose.bind(this,"POST")}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Add your own Post"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.props.blogReducer.open}
                >
                    <TextField
                        hintText="Post Heading"
                        floatingLabelText="Post Heading"
                        fullWidth={true}
                        onChange={this.handleChange.bind(this,"HEADING")}
                    /><br /><br/>
                    <div>
                        <label>Upload an image</label>
                        <Dropzone
                            onDrop={this.onDrop}
                            multiple={false}
                            className="dropzone"
                        >
                            <div><img s rc={this.state.image.preview} width={200} height={200} alt=""/></div>
                        </Dropzone>
                    </div>
                    <br/><br/>
                    <div>
                        <label>Post Content</label><br/>
                        <RichTextEditor
                            value={this.state.value}
                            onChange={this.setContent}
                            toolbarConfig={toolbarConfig}
                        />
                    </div>
                    <br/>
                </Dialog>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

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
        },
        addPost : (data)=>{
            dispatch(addPost(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AddPost);