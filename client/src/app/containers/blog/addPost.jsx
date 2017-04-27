import React from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions.js";
import {openModal,addPost} from "../../actions/blogActions.js";
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import request from 'superagent';
import {Component, PropTypes} from 'react';
let Dropzone = require('react-dropzone');
import RichTextEditor from 'react-rte';
let loginStyle = require('./../../css/login.css');
const CLOUDINARY_UPLOAD_PRESET = 'sbidnltg';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/yash04/image/upload';

class AddPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
                text: '',
                validateHeading : false ,
                open : false,
                validateContent : false,
                validateImage : false ,
                heading : "" ,
                content : "",
                image : "",
                value: RichTextEditor.createEmptyValue(),
                message : "",
                uploadedFileCloudinaryUrl:""

        }
        this.onDrop= this.onDrop.bind(this)
        this.setContent= this.setContent.bind(this)
        this.handleImageUpload= this.handleImageUpload.bind(this)
    }
    static propTypes = {
        onChange: PropTypes.func
    };
    componentWillReceiveProps(props){
        this.props= props
    }/* handle snackbar close*/
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    /*hanlde open modal*/
    handleOpen = () => {
        this.props.openModal(true)
    };
    /*handle close event of dialog*/
    handleClose = (event,type) => {
        switch(event){
            case "CANCEL":
                this.props.openModal(false)
                this.setState({image : {},value: RichTextEditor.createEmptyValue()})
                break
            case "POST":
                var data = {
                    heading : this.state.heading,
                    content : this.state.value.toString('html'),
                    image : this.state.uploadedFileCloudinaryUrl
                }
                this.props.addPost(data)
                this.props.openModal(true)
                this.setState({open : true, message : "Post Added" ,value: RichTextEditor.createEmptyValue()})

                break
            default:
                break
        }
    };
    /*event on image drop*/
    onDrop(files){
        console.log("Files onDrop",files)
        this.setState({
            image : files[0],
            validateImage:true
        })
        this.handleImageUpload(files[0])
    }
    /*handle image upload to cloudinary server*/
    handleImageUpload(file){
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }
    /*handle change for all data fields*/
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
    /*setting the post content and validating the button */
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
        console.log("INSIDE RENDER",this.state)
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL")}
            />,
            <FlatButton
                label="Post"
                primary={true}
                disabled={!(this.state.validateContent&&this.state.validateHeading&&this.state.validateImage)}
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
                    // contentStyle={{height:1000}}
                    className="postModal"
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
                            <div><img src={this.state.image.preview} width={200} height={200} alt=""/></div>
                        </Dropzone>
                    </div>
                    <br/><br/>
                    <div>
                        <label>Post Content</label><br/>
                        <RichTextEditor
                            value={this.state.value}
                            onChange={this.setContent}
                            toolbarConfig={toolbarConfig}
                            className="richTextEditor"
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