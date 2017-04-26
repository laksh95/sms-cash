import React from 'react';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions.js";
import {getPost,addComment,editComment,deleteComment,setLikes,setCurrentLike,getComments,setSnackbarOpen} from "./../../actions/blogActions.js";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import TextField from 'material-ui/TextField';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Snackbar from 'material-ui/Snackbar';
import LazyLoad from 'react-lazyload';
let loginStyle = require('./../../css/login.css');

import RichTextEditor from 'react-rte';
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
            validateEditComment : true,
            showComments : true,
            likes: 0,
            pageNumber :1
        }
        this.handleChange= this.handleChange.bind(this)
    }
    componentWillMount() {
        this.props.getPost({
            id : this.props.params.postid,
            user_id : this.props.blogReducer.userId,
            // commentsNumber : this.state.commentsNumber
        })
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    /* close snackbar*/
    handleRequestClose = () => {
        this.props.setSnackbarOpen(false)
    };
    /*handle change for data fields*/
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
    /*post comment */
    postComment(){
        let comment = this.state.value
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
                value : "",
                errorText : ""
            });
        }
    }
    /*handle close for edit and delete */
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
    /*edit a comment*/
    editComment(data){
        this.setState({showEdit: true});
        this.setState({
            comment: data
        })
    }
    /*delete a comment*/
    deleteComment(data){
        this.setState({showDelete:true})
        this.setState({comment:data})
    }
    /*event for checkbox*/
    handleCheck=(event,checked)=> {
        let likes = this.props.blogReducer.post.likes
        console.log(checked)
        if(checked===false){
            let data = {
                liked : false ,
                likes : likes-1,
                post : this.props.blogReducer.post
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post : this.props.blogReducer.post,
                liked : false ,
                user_id : this.props.blogReducer.userId
            }

            this.props.setLikes(data1)
        }
        else{
            let data = {
                liked : true ,
                likes : likes+1,
                post : this.props.blogReducer.post
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post :this.props.blogReducer.post ,
                liked :true ,
                user_id : this.props.blogReducer.userId
            }
            this.props.setLikes(data1)
        }

    }
    render(){
        let content = RichTextEditor.createEmptyValue()
        let post = this.props.blogReducer.post
        console.log(post)
        content = post.content
        console.log(content)
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
                        {this.props.blogReducer.post.heading}
                        {/*Cracking the Coding Interview*/}
                    </div>
                    <div className="postImage">
                        <img src={this.props.blogReducer.post.image} width={700} alt=""/>
                    </div>
                    <div className="postContent">
                        <p>
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </p>
                    </div>
                    <div className="postFooter">
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            label={this.props.blogReducer.post.likes}
                            className="left"
                            onCheck={this.handleCheck.bind(this)}
                            style={{...styles.checkbox,...styles.block}}
                            checked={this.props.blogReducer.post.liked}
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
                            <br/><br/>
                            {this.state.showComments?
                                this.props.blogReducer.comments.map((data,index)=>{
                                    return(
                                    <LazyLoad height={200} offset={100}>
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
                                    </LazyLoad>
                                    )
                                })
                                : null}
                            {this.props.blogReducer.moreComments?
                                <RaisedButton label="Load More" onClick={()=>{
                                    this.props.getComments({
                                        id : this.props.blogReducer.post.id ,
                                        pageNumber : this.props.blogReducer.commentPageNumber
                                    })
                                }} fullWidth={true} /> :null}

                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.props.blogReducer.snackbarOpen}
                    message={this.props.blogReducer.snackbarMessage}
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
        },
        setLikes:(data)=>{
            dispatch(setLikes(data));
        },
        setCurrentLike:(data)=>{
            dispatch(setCurrentLike(data))
        },
        getComments:(data)=>{
            dispatch(getComments(data))
        },
        setSnackbarOpen:(data)=>{
            dispatch(setSnackbarOpen(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Post);
