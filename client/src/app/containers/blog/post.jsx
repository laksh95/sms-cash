import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {getPost,addComment,editComment,deleteComment} from "./../../actions/blogActions.jsx";
import Auth from './../../Auth.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
import Snackbar from 'material-ui/Snackbar';


let loginStyle = require('./../../css/login.css');
class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errorText :"",
            value : "",
            open : false,
            showEdit : false,
            showDelete : false ,
            comment : {},
            editComment: "",
            validateEditComment : true
        }
        this.handleChange= this.handleChange.bind(this)
    }
    componentWillMount() {
        this.props.getPost({
            id : 1
        })
    }
    componentDidMount() {
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    showComments(){

    }
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    // handleTouchTap() {
    //     alert('You clicked the Chip.');
    // }
    handleChange(type,event) {
        switch(type){
            case "COMMENT":
                this.setState({value: event.target.value});
                break
            case "EDIT_COMMENT":
                this.setState({editComment:event.target.value})
                if(event.target.value.trim()!=""){
                    this.setState({validateEditComment: true })
                }
                else {
                    this.setState({validateEditComment: false })
                }
                break
            default : break
        }
    }
    postComment(){
        let comment = this.state.value
        console.log(comment)
        if(comment.trim()==''){
            this.setState({
                errorText : "Comment can't be empty"
            })
        }
        else{
            this.props.addComment({
                content : this.state.value ,
                post_id : this.props.blogReducer.post.id,
                comment_by : 1
            })
            this.setState({
                open: true,
                value : ""
            });
        }
    }

    handleClose = (type) => {
        // to be changed
        switch(type){
            case "SUBMIT_EDIT":
                this.setState({showEdit: false});
                var comment = this.state.comment
                comment.content = this.state.editComment
                this.props.editComment(comment)
                break
            case "CANCEL_EDIT":
                this.setState({showEdit:false});
                break
            case "SUBMIT_DELETE":
                this.setState({showDelete : false });
                var comment = this.state.comment
                this.props.deleteComment(comment)
                break
            case "CANCEL_DELETE":
                this.setState({showDelete:false});
                break
            default:break
        }

    };
    editComment(data){
        this.setState({showEdit: true});
        console.log("Edit Comment",data)
        this.setState({
            comment: data
        })
    }
    deleteComment(data){
        this.setState({showDelete:true})
        this.setState({comment:data})
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL_EDIT")}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={!(this.state.validateEditComment)}
                onTouchTap={this.handleClose.bind(this,"SUBMIT_EDIT","SUBMIT")}
            />,
        ];
        const deleteActions = [
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL_DELETE")}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"SUBMIT_DELETE")}
            />,
        ];
        const styles = {
            chip: {
                marginLeft: 342,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            block: {
                maxWidth: 50,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        return (
            <div className={loginStyle.mymain}>
                <div className="post">
                    <div className="postHeader">
                        <List>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar src="https://cdn-images-1.medium.com/fit/c/54/54/0*WgY9B-Lm4DnCEHlO.jpeg" />
                                }
                            >
                                {this.props.blogReducer.post.user_name}
                            </ListItem>
                        </List>
                    </div>
                    <div className="postHeader">
                        {this.props.blogReducer.post.content}
                    </div>
                    <div className="postContent">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, magni molestiae obcaecati quibusdam quisquam quod ut voluptates. Aliquam numquam, ratione. Deserunt eaque ex inventore itaque minima optio sapiente, sed tempora.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda error id molestiae nihil quasi voluptatum? Aliquam atque autem dolore eos esse fugit incidunt inventore maiores mollitia nobis omnis, quos, ut.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, assumenda consectetur cumque eaque eligendi enim fugiat id in incidunt iste laborum molestiae, natus obcaecati omnis quisquam vel velit voluptatum?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi assumenda at dolores dolorum eligendi explicabo id iste nisi obcaecati, odit, provident qui quis quos rem repellat tempora ullam velit.
                        </p>

                    </div>
                    <div className="postFooter">
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            label="30"
                            className="left"
                            style={{...styles.checkbox,...styles.block}}
                        />
                        <br/><br/>
                        <div className="addComment">
                            <label className="headerFont">Responses</label>
                            <br/>
                            <TextField
                                hintText=""
                                floatingLabelText="Write your comment"
                                multiLine={true}
                                rows={3}
                                value={this.state.value}
                                onChange={this.handleChange.bind(this,"COMMENT")}
                                errorText={this.state.errorText}
                            /><br /><br/>
                            <RaisedButton label="Post Comment" onClick={()=>this.postComment()} primary={true}/><br/><br/>
                        </div>
                        <div className="postComments">
                            <RaisedButton label="Show All responses" fullWidth={true} /><br/><br/>
                            {this.props.blogReducer.comments.map((data,index)=>{
                                return(
                                    <Card className="marginBottom">
                                    <CardHeader
                                        title={data.user_name}
                                        subtitle=""
                                        avatar="https://cdn-images-1.medium.com/fit/c/54/54/0*WgY9B-Lm4DnCEHlO.jpeg"
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                    />

                                    <CardText className = 'commentFont'>
                                        {data.content}
                                    </CardText>
                                    {this.props.blogReducer.username==data.user_name?
                                        <CardActions>
                                            <FlatButton onClick = {()=>this.editComment(data)} label="Edit" />
                                            <FlatButton onClick = {()=>this.deleteComment(data)} label="Delete" />
                                        </CardActions>
                                    :null}
                                </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.open}
                    message="Comment Added"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.state.showEdit}
                >
                    <TextField
                        id="text-field-default"
                        defaultValue={this.state.comment.content}
                        onChange={this.handleChange.bind(this,"EDIT_COMMENT")}
                    /><br />
                </Dialog>
                <Dialog
                    title="Delete your comment"
                    actions={deleteActions}
                    modal={true}
                    open={this.state.showDelete}
                >
                </Dialog>
            </div>
        );
    }
}
Post.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
Post.contextTypes = {
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
        getPost :(data) =>{
            dispatch(getPost(data));
        },
        addComment:(data)=>{
            dispatch(addComment(data));
        },
        editComment:(data)=>{
            dispatch(editComment(data));
        },
        deleteComment:(data)=>{
            dispatch(deleteComment(data));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Post);